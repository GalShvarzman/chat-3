function ChatTree(element) {
    function load(items) {
        const tree = walkTree(items);
        for(let item of tree){
            element.appendChild(item);
        }
        addClickListener(element);
        addDblClickListener(element);
        addKeyUpListener(element);
    }

    function addKeyUpListener(element){
        element.addEventListener("keyup", (e)=>{
            const keyName = e.key;
            if(keyName === "ArrowRight"){
                openChildren(e.target);
            }
            else if((keyName === "ArrowLeft")){
                closeChildren(e.target);
            }
            else if(keyName === "ArrowDown"){
                walkDown(e.target);
            }
        })
    }

    function walkDown(element){
        if(element.nextElementSibling.style.display === "block"){debugger
            element.nextElementSibling.children[0].child.toggleFocus();
        }
        else{debugger
            element.parentElement.nextElementSibling.child.focus();
        }
        element.blur();
        debugger
    }

    function openChildren(element){
        if(element.nextElementSibling){
            element.nextElementSibling.style.display = "block";
            element.nextElementSibling.focus();
        }
    }

    function closeChildren(element){
        if(element.parentElement.parentElement && element.parentElement.parentElement.className !== "left tree"){
            element.style.display = "none";

        }
    }

    function walkTree(items){
        const result = [];
        items.forEach((item)=>{
            const li = createLi(item);
            if(item.items){
                const ul = createUl();
                walkTree(item.items).forEach((childItem)=>{
                    ul.appendChild(childItem);
                });
                ul.style.display = 'none';
                li.appendChild(ul);
                result.push(li);
            }
            else{
                result.push(li);
            }
        });
        return result;
    }

    function toggleDisplay(element){
        if (element.style.display !== "none") {
            element.style.display = "none";
        }
        else {
            element.style.display = "block";
        }
    }

    function toggleFocus(element){debugger
        if(document.activeElement === element){
            element.focus();
        }


        // if(element.style.background === "rgb(244, 245, 245)"){
        //     element.style.background = "#3995ff"
        // }
        // else{
        //     element.style.background = "rgb(244, 245, 245)";
        // }
    }

    function addDblClickListener(element){
        element.addEventListener("dblclick", (e)=>{
            toggleDisplay(e.target.nextElementSibling);
            e.stopPropagation();
        });
    }

    function addClickListener(element){
        element.addEventListener("click", (e)=>{
            toggleFocus(e.target);
            e.target.focus();
            e.stopPropagation();
        })
    }

    function createLi(item){
        const name = document.createTextNode(item.name);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("tabindex","1");
        a.appendChild(name);
        if(item.type === "group"){
            a.style.cursor = "pointer";
            a.style.color = "#016b42";
        }
        //a.style.background = "rgb(244, 245, 245)";
        li.appendChild(a);
        return li;
    }

    function createUl(){
        return document.createElement("ul");
    }

    function clear() {
    }

    return {
        load,
        clear,
        element
    };
}
