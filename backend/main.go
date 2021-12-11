package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"sync"

	"github.com/gorilla/mux"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/task", returnAllTask)
	myRouter.HandleFunc("/task/details/{id}", returnSingleTask)
	myRouter.HandleFunc("/task/create", createNewTask).Methods("POST")
	myRouter.HandleFunc("/task/update/{id}", updateTask).Methods("POST")

	myRouter.HandleFunc("/tag", returnAllTag)
	myRouter.HandleFunc("/tag/create", createNewTag).Methods("POST")
	myRouter.HandleFunc("/tag/edit/{id}", editTag).Methods("POST")
	myRouter.HandleFunc("/tag/delete/{id}", deleteTag).Methods("POST")
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func returnAllTask(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAllTask")
	json.NewEncoder(w).Encode(Tasks)
}

func returnAllTag(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnAllTag")
	json.NewEncoder(w).Encode(Tags)
}

func returnSingleTask(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: returnSingleTask")
	vars := mux.Vars(r)
	key := vars["id"]
	for _, Task := range Tasks {
		if strconv.Itoa(Task.Id) == key {
			json.NewEncoder(w).Encode(Task)
		}
	}
}

func createNewTask(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	fmt.Fprintf(w, "%+v", string(reqBody))
	var Task Task
	json.Unmarshal(reqBody, &Task)
	Task.Id = TaskId.ID()
	Tasks = append(Tasks, Task)
	json.NewEncoder(w).Encode(Task)
}

func updateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for index, currentTasks := range Tasks {
		if strconv.Itoa(currentTasks.Id) == id {
			oldTasks := Tasks
			reqBody, _ := ioutil.ReadAll(r.Body)
			fmt.Fprintf(w, "%+v", string(reqBody))
			var Task Task
			json.Unmarshal(reqBody, &Task)
			Tasks = append(Tasks[:index], Task)
			json.NewEncoder(w).Encode(Task)
			Tasks = append(Tasks, oldTasks[index+1:]...)
		}
	}
}

func createNewTag(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	fmt.Fprintf(w, "%+v", string(reqBody))
	var Tag Tag
	json.Unmarshal(reqBody, &Tag)
	Tag.Id = TagId.ID()
	Tags = append(Tags, Tag)
	json.NewEncoder(w).Encode(Tag)
}

func editTag(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for index, currentTags := range Tags {
		if strconv.Itoa(currentTags.Id) == id {
			oldTags := Tags
			reqBody, _ := ioutil.ReadAll(r.Body)
			fmt.Fprintf(w, "%+v", string(reqBody))
			var Tag Tag
			json.Unmarshal(reqBody, &Tag)
			Tags = append(Tags[:index], Tag)
			json.NewEncoder(w).Encode(Tag)
			Tags = append(Tags, oldTags[index+1:]...)
		}
	}
}

func deleteTag(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for index, Tag := range Tags {
		if strconv.Itoa(Tag.Id) == id {
			Tags = append(Tags[:index], Tags[index+1:]...)
		}
	}
}

func main() {
	handleRequests()
}

type User struct {
	Id       int    `json:"id"`
	UserName string `json:"userName"`
	Email    string `json:"email"`
}

type Task struct {
	Id         int    `json:"id"`
	UserId     int    `json:"userId"`
	TaskName   string `json:"taskName"`
	Details    string `json:"details"`
	TagId      []int  `json:"tagId"`
	Deadline   string `json:"deadline"`
	Priority   string `json:"priority"`
	TaskStatus string `json:"taskStatus"`
	CreatedBy  string `json:"createdBy"`
	AssignedTo string `json:"assignedTo"`
}

type Tag struct {
	Id      int    `json:"id"`
	TagName string `json:"tagName"`
	Colour  string `json:"colour"`
}

type autoIncrement struct {
	sync.Mutex // ensures autoIncrement is goroutine-safe
	Id         int
}

func (a *autoIncrement) ID() (id int) {
	a.Lock()
	defer a.Unlock()

	id = a.Id
	a.Id++
	return
}

var Users []User
var Tasks []Task
var Tags []Tag

var UserId autoIncrement
var TaskId autoIncrement
var TagId autoIncrement
