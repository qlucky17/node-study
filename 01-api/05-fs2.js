const fs = require('fs');

const projectData = {
	'name': 'src',
	'fileData':[
		{'name': 'css', 'type': 'dir'},
		{'name': 'js', 'type': 'dir'},
		{'name': 'images', 'type': 'dir'},
		{
			'name': 'index.html', 
			'type': 'file', 
			'content': '<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>自动化构建项目</title>\n</head>\n<body>\n\t<h1>Hello Node</h1>\n</body>\n</html>'
		}
	]
};
if(projectData.name){
	fs.mkdirSync(projectData.name, (err)=>{
		// console.log(err)
	});
	var fileData = projectData.fileData;
	if(fileData && fileData.forEach){
		fileData.forEach(function(file,index){
			file.path = projectData.name + '/' + file.name;
			switch(file.type){
				case 'dir':
					fs.mkdirSync(file.path, err=>{
						// console.log(err)
					});
					break;
				case 'file':
					var content = file.content ? file.content : '';
					fs.writeFile(file.path, content, err=>{
						// console.log(err)
					})
					break;
				default:
					break;
			}
		})
	}
}