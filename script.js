// function formatDoc(cmd, value=null) {

// 	if(value) {
// 		document.execCommand(cmd, false, value);
// 	} else {
// 		document.execCommand(cmd);
// 	}
// }
function formatDoc(command, value = null) {
	if (command === 'fontName' && value) {
		var selection = window.getSelection();
		if (selection.rangeCount > 0) {
			var span = document.createElement('span');
			span.style.fontFamily = value;
			selection.getRangeAt(0).surroundContents(span);
		}
	}
	else {
		document.execCommand(command, false, value);
	}

}
function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}




const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item => {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})


const filename = document.getElementById('filename');

function fileHandle(value) {
	if (value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if (value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if (value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}

function addInputText() {

	var newDiv = document.createElement("div");

	newDiv.className = "inputtext";
	newDiv.id = "content";
	newDiv.contentEditable = true;
	newDiv.spellcheck = false;
	newDiv.textContent = "Lorem, ipsum.";
	document.querySelector(".textcontain").appendChild(newDiv);
}

