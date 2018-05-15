function ChatTree(element) {
    function load(items) {
        this.clear();
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
            if(e.target.className === "left tree"){
                e.target.children[0].querySelector(":scope > a").focus();
            }
            else if(keyName === "ArrowRight"){
                openChildren(e.target);
            }
            else if((keyName === "ArrowLeft")){
                closeChildren(e.target);
            }
            else if(keyName === "ArrowDown"){
                walkDown(e.target);
            }
            else if(keyName === "ArrowUp"){
                walkUp(e.target);
            }
        })
    }

    function walkDown(element){
        if(element.nextElementSibling){
            if(element.nextElementSibling.style.display === "block"){
                element.nextElementSibling.querySelector(":scope  a").focus();
            }
            else{
                element.parentElement.nextElementSibling.querySelector(":scope > a").focus();
            }
        }
        else{
            if(element.parentElement.nextElementSibling){
                element.parentElement.nextElementSibling.querySelector(":scope > a").focus();
            }
        }
    }

    function walkUp(element){
        if(element.parentElement.previousElementSibling){
            element.parentElement.previousElementSibling.querySelector(":scope > a").focus();
        }
        else if(element.parentElement.parentElement.className === "left tree"){
            element.focus();
        }
        else{
            element.parentElement.parentElement.parentElement.querySelector(":scope a").focus();
        }
    }

    function openChildren(element){
        if(element.nextElementSibling){
            element.nextElementSibling.style.display = "block";
            element.nextElementSibling.focus();
        }
    }

    function closeChildren(element){
        if(element.parentElement.parentElement && element.parentElement.parentElement.className !== "left tree"){
            element.parentElement.parentElement.style.display = "none";
            element.parentElement.parentElement.parentElement.querySelector(":scope a").focus();
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
        if(element){
            if (element.style.display !== "none") {
                element.style.display = "none";
            }
            else {
                element.style.display = "block";
            }
        }
    }

    function setFocus(element){
        if(document.activeElement === element){
            element.focus();
        }
    }

    function addDblClickListener(element){
        element.addEventListener("dblclick", (e)=>{
            toggleDisplay(e.target.nextElementSibling);
            e.stopPropagation();
        });
    }

    function addClickListener(element){
        element.addEventListener("click", (e)=>{
            setFocus(e.target);
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
            a.style.color = "#076b51";
        }
        li.appendChild(a);
        return li;
    }

    function createUl(){
        return document.createElement("ul");
    }

    function clear() {
        const treeChildren = document.getElementsByClassName("left tree")[0].children;
        while(treeChildren.length){
            treeChildren[0].remove();
        }
    }

    return {
        load,
        clear,
        element
    };
}
