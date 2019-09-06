// use this script at 成绩查询(新) to generate teaching event json
// let table, rows, title_row, data_rows

table = document.getElementById('Table4')

table = table.getElementsByTagName('tbody')[3]

rows = table.getElementsByTagName('tr')

rows = Array.from(rows)

rows = rows.map(o=>Array.from(o.children))

title_row = rows[0]

data_rows = rows.slice(1, -3)

function each_row(row){
	return row.map(o=>o.innerText)
}

title_row = each_row(title_row)

data_rows = data_rows.map(each_row)

// build obj

function buildObj(title_row){
	return function(row){
		obj = {}
		title_row.map(function(o,index){
			obj[o] = row[index].trim()
		})
		return obj
	}
}
data_rows.map(buildObj(title_row))
