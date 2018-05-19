function ChatTree(element) {
    function load(items) {
        element.remove();
        if(element.children.length){
            removeChildren(element);
        }
        const tree = walkTree(items, 0);
        for(let item of tree){
            element.appendChild(item);
        }
        document.body.insertBefore(element,document.body.firstChild);
        addEventListenersToList(element);
    }

    function addEventListenersToList(){
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
            else if(keyName === "ArrowDown" || keyName === "ArrowUp"){
                getAllLi(e.target, keyName);
            }
            else if(keyName === "Enter"){
                toggleExpandOrCollapse(e.target)
            }
        })
    }

    function toggleExpandOrCollapse(element) {
        if(element.nextElementSibling){
            toggleDisplay(element.nextElementSibling);
        }
    }

    function getAllLi(element, keyName){
        const selectedLi = element.parentElement;
        const allLi = document.querySelectorAll("li");

        function getDisplayedLi(){
            const result = [];
            for(let i = 0; i < allLi.length; i++){
                if(allLi[i].offsetParent){
                    result.push(allLi[i]);
                }
            }
            return result;
        }
        const displayedLi = getDisplayedLi();
        function findIndex (){
            let result;
            for(let i = 0; i < displayedLi.length; i++){
                if(displayedLi[i] === selectedLi){
                    result = i;
                }
            }
            return result;
        }
        const index = findIndex();
        if(index !== -1){
            if(keyName === "ArrowDown"){
                const nextLi=index+1;
                if(nextLi < displayedLi.length){
                    displayedLi[nextLi].querySelector(":scope>a").focus();
                }
            }
            else if(keyName === "ArrowUp"){
                const nextLi=index-1;
                if(nextLi >= 0){
                    displayedLi[nextLi].querySelector(":scope>a").focus();
                }
            }
        }
    }

    function openChildren(element){
        if(element.nextElementSibling){
            element.nextElementSibling.style.display = "block";
            element.nextElementSibling.focus();
        }
    }

    function closeChildren(element){
        if(element.parentElement.parentElement){
            if(element.nextElementSibling){
                if(element.nextElementSibling.style.display === "block"){
                    element.nextElementSibling.style.display = "none";
                }
                else{
                    element.parentElement.parentElement.parentElement.querySelector(":scope a").focus();
                }
            }
        }
    }

    function walkTree(items, step){
        const result = [];
        items.forEach((item)=>{
            const li = createLi(item, step);
            if(item.items){
                const ul = createUl();
                walkTree(item.items, step+1).forEach((childItem)=>{
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

    function addDblClickListener(element){
        element.addEventListener("dblclick", (e)=>{
            toggleDisplay(e.target.nextElementSibling);
            e.stopPropagation();
        });
    }

    function addClickListener(element){
        element.addEventListener("click", (e)=>{
            e.target.focus();
            e.stopPropagation();
        })
    }

    function padding(number){
        let start = "";
        let space = "&nbsp&nbsp";
        for(let i = 0; i < number; i++){
            start+=space;
        }
        return start;
    }

    function createLi(item, step){
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("tabindex","1");
        const space = padding(step);
        if(item.type === "group"){
            a.innerHTML = space+"☺"+item.name;
            a.style.cursor = "pointer";
            a.style.color = "#113f6b";
        }
        else{
            a.innerHTML = space+item.name;
            a.style.color = "#006cbe";
        }
        li.appendChild(a);
        return li;
    }

    function createUl(){
        return document.createElement("ul");
    }

    function removeChildren(element){
        let length = element.children.length;
        while(length > 0){
            element.children[--length].remove();
        }
    }

    function clear() {
        if(element.children.length){
            element.remove();
            removeChildren(element);
            document.body.insertBefore(element,document.body.firstChild);
        }
    }

    return {
        load,
        clear,
        element
    };
}
