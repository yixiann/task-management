// For personal reference

// STEP 1 Open new spreadsheet in excel
// STEP 2 Paste english code in A1 (Each line of code should be in one cell. Meaning only column A is filled now)

// [ STEP 3 TO STEP 10 Removes blank cells in Column A]
// STEP 3 Select column A
// STEP 4 ctrl+g (Go to)
// STEP 5 Select Special
// STEP 6 Select Blank
// STEP 7 Right click any of the selected blank cells
// STEP 8 Select Delete
// STEP 9 Select Shift Cell up
// STEP 10 Select Okay

// [ STEP 11 TO STEP 12 extracts text between quotation marks to column B ]
// STEP 11 Insert command =MID(A1,FIND("""",A1)+1,FIND("""",A1,FIND("""",A1)+1)-FIND("""",A1)-1) in cell B1
// STEP 12 Double click on the corner of cell B1 to auto fill column B. (You should have column B filled up now)

// [ Unfortunately sheets do not have a google translate function. We have to head over to google sheets now]
// [ STEP 13 TO STEP 15 converts column B in excel to our desired language]
// STEP 13 Copy column B in excel, open a google sheets document and paste column in cell A1
// [ List of google language codes can be found on https://sites.google.com/site/opti365/translate_codes]
// STEP 14 Fill A1 with any random english word. The first function must not fail additionally there should be no empty cells beween A1 and the first word ]
// [zh-ch is Simplified Chinese. Replace zh-en with any other code from google language codes]
// STEP 15 Insert command =GOOGLETRANSLATE(A1, "en", "zh-cn") in cell B1
// STEP 16 Double click on the corner of cell B1 to auto fill column B. (You should have column B filled up now) (Auto fill will not work if function fails)
// STEP 17 Copy column B in google sheets and paste it in column B in excel

// [ STEP 18 TO STEP 22 Clears dirty data and pick up incorrect translations]
// STEP 18 Select column B
// STEP 19 Select sort and filter, Filter
// STEP 20 Filter failed translations and rectify manually using google translate

// [ STEP 21 TO STEP 25 is to reconstruct the code with the new language]
// STEP 21 Filter all values except #VALUE! 
// STEP 22 Insert command =CONCATENATE(LEFT(A1,(FIND("""",A1,1))),B1,""",") in cell C1
// STEP 23 Double click on the corner of cell C1 to auto fill column C. (You should have column C filled up now)
// STEP 24 Filter all values #VALUE! 
// STEP 25 Insert command =A2 in cell C2
// STEP 25 Double click on the corner of cell C1 to auto fill column C. (You should have column C filled up now)
// STEP 26 Clear filters.

// [ STEP 26 TO STEP 27 is to beautify code]
// STEP 26 Copy code in Column C and head over to https://beautifier.io/
// STEP 27 Copy result and paste here.

const language = {
  title: {
      taskManagement: "任务管理",
      createTask: "创建任务",
      viewTask: "查看任务",
      editTask: "编辑任务",
      updateTask: "更新任务",
      taskOverview: "任务概述",
  },
  text: {
      search: "搜索任务或详细信息",
      tagName: "标签名称",
      none: "没有任何",
  },
  button: {
      back: "后退",
      backHome: "回家",
      cancel: "取消",
      create: "创建",
      details: "细节",
      delete: "删除",
      deleteSelected: "删除所选",
      edit: "编辑",
      save: "保存",
      submit: "提交",
      update: "更新",
      manageTags: "管理标签",
      deleteTask: "删除任务",
      createTask: "创建任务",
      createTag: "创建标记",
  },
  colour: {
      none: "没有任何",
      magenta: "品红",
      red: "红色的",
      volcano: "火山",
      orange: "橘子",
      gold: "金子",
      lime: "酸橙",
      green: "绿",
      cyan: "青色",
      blue: "蓝色",
      geekblu: "极客蓝色",
      purple: "紫色的",
  },
  priority: {
      high: "高的",
      medium: "中等的",
      low: "低的",
  },
  taskStatus: {
      completed: "完全的",
      inProgress: "进行中",
      notStarted: "没有开始",
      backlog: "积压",
  },
  message: {
      taskName: "请输入任务名称！",
      selectColour: "请选择颜色",
      confirmDeletion: "确认删除",
      actionIrreversible: "这个动作是不可逆转的！",
      deleteForever: "永远删除",
      taskExist: "任务已经存在",
      taskDeleteSuccess: "任务已成功删除",
      taskDeleteFail: "任务已删除失败",
      taskCreateSuccess: "任务成功创建",
      taskCreateFail: "无法创建任务",
      taskEditSuccess: "任务成功保存",
      taskEditFail: "无法保存任务",
      taskFetchFail: "无法获取任务数据",
      taskUpdateFail: "无法更新任务",
      tagExist: "标签已存在",
      tagFetchFail: "无法获取标签数据",
      tagCreateFail: "无法创建标记",
      tagEditFail: "无法编辑标记",
      tagDeleteFail: "无法删除标记",
      tagDeleteSuccess: "标签已删除",
      loading: "loading ...",
      success: "成功！",
      error: "错误！",
  },
  overviewTaskTable: {
      taskName: "任务名称",
      details: "细节",
      tags: "标签",
      deadline: "最后期限",
      createdBy: "由...制作",
      assignedTo: "分配给",
      priority: "优先事项",
      taskStatus: "地位",
      actions: "行动",
  },
  tagsManagement: {
      helpTag: "在“管理标签”下创建一个新标记",
      manageTags: "管理标签",
      createTag: "创建标记",
      tagName: "标签名称",
      tagColour: "标签颜色",
      tags: "标签",
      colour: "颜色",
      actions: "行动",
  },
  task: {
      taskName: "任务名称",
      details: "细节",
      tags: "标签",
      deadline: "最后期限",
      createdBy: "由...制作",
      assignedTo: "分配给",
      priority: "优先事项",
      status: "地位",
  },
  settings: {
      settings: "设置",
      language: "语",
  },
};
export default language;