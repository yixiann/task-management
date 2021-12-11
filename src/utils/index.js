import { Select } from "antd";

export const CustomMenu = ({
  language,
  fields,
  defaultValue,
  value,
  onSelect,
  colour = false,
}) => {
  const { Option } = Select;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Select
        value={value}
        defaultValue={defaultValue}
        style={{ width: 120 }}
        onSelect={(e) => onSelect(e)}
      >
        {Object.keys(fields).map((item) => (
          <Option
            value={item}
            style={{ backgroundColor: colour ? getColour(item) : "white" }}
          >
            {language?.[item]}
          </Option>
        ))}
      </Select>
    </a>
  );
};

export const getColour = (value) => {
  const colours = {
    magenta: "#ff85c0",
    red: "#ff7875",
    volcano: "#ff9c6e",
    orange: "#ffc069",
    gold: "#ffd666",
    lime: "#d3f261",
    green: "#95de64",
    cyan: "#5cdbd3",
    blue: "#69c0ff",
    geekblu: "#85a5ff",
    purple: "#b37feb",
  };
  return colours?.[value] ? colours[value] : "white";
};

export const getKeyById = (data, key, value) => {
  const result = data?.filter((item) => item.id === value)[0]?.[key];
  return result;
};

export const sorter = (c, d) => {
  var regex = /[^\d]+|\d+/g;
  var a = c ? c.toString() : " ";
  var b = d ? d.toString() : " ";

  // Split each filename into alphabetical and numeric parts
  var ar = a.match(regex);
  var br = b.match(regex);
  var localeCompare;

  // For each part in the two split names, perform the following comparison:
  for (var ia in ar) {
    for (var ib in br) {
      var ari = ar[ib];
      if (ari === undefined) {
        ari = "";
      }
      var bri = br[ib];
      if (bri === undefined) {
        bri = "";
      }

      // If both parts are strictly numeric, compare them as numbers
      if (!isNaN(ari) && !isNaN(bri)) {
        localeCompare = ari.localeCompare(
          bri,
          {},
          {
            numeric: true,
          }
        );
      } else {
        localeCompare = ari.localeCompare(
          bri,
          {},
          {
            ignorePunctuation: true,
            sensitivity: "base",
          }
        );
      }
      if (localeCompare !== 0) {
        // If you run out of parts, the name with the fewest parts comes first
        return localeCompare;
      }

      // If they're the same, move on to the next part
    }
  }
  return localeCompare;
};

export const getFilters = (language, data, key) => {
  if (data)
    var filters = data?.map((item) => ({
      text: language[item[key]],
      value: item[key],
    }));
  var uniquefilters = [];
  for (let i = 0; i < filters?.length; i++) {
    if (
      !uniquefilters
        .map((item) => JSON.stringify(item))
        .includes(JSON.stringify(filters[i]))
    ) {
      uniquefilters.push(filters[i]);
    }
  }

  var result = uniquefilters
    .sort((a, b) => sorter(a.text, b.text))
    .filter((item) => {
      return item.text !== "";
    });

  return result;
};

export const checkForDuplicates = (data, key, value) => {
  return (
    data?.filter((item) =>
      item?.[key]
        ? item[key].toLowerCase().trim() === value.toLowerCase().trim()
        : false
    ).length !== 0
  );
};

export const formatDate = (date) => {
  return date?.slice(8, 10) + "/" + date?.slice(5, 7) + "/" + date?.slice(0, 4);
};
