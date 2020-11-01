//Create interactive lightbox
let galleryImg = document.querySelectorAll(".gallery-img")
let getLatestOpenedImg
let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

if(galleryImg) {
    galleryImg.forEach((img, index) => {
        img.addEventListener("click", e => {
            let getElementCss = window.getComputedStyle(img)
            let getFullImgUrl = getElementCss.getPropertyValue("background-image")
            let getImgUrlPos = getFullImgUrl.split("/media/thumbnails/")
            let setNewImgUrl = getImgUrlPos[1].replace('")', "")

            getLatestOpenedImg = index + 1

            //Create lightbox background
            let container = document.body
            let newImgWindow = document.createElement("div")
            
            container.appendChild(newImgWindow)
            newImgWindow.setAttribute("class", "img-window")
            // newImgWindow.setAttribute("onclick", "closeImg()")

            //Create and append lightbot img
            let newImg = document.createElement("img")
            newImgWindow.appendChild(newImg)
            newImg.src = `../media/${setNewImgUrl}`
            newImg.setAttribute("id", "current-img")

            //Adjust next and prev button locations according to image size
            newImg.onload = function () {
                let imgWidth = this.width
                let imgHeight = this.height
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80
                let calcImgtoTop = ((windowHeight - imgHeight) /2) - 80

                //Next Btn
                let newNextBtn = document.createElement("a")
                let btnNextText = document.createTextNode("Next")
                newNextBtn.appendChild(btnNextText)
                container.appendChild(newNextBtn)
                newNextBtn.setAttribute("class", "img-btn")
                newNextBtn.id = "img-btn-next"
                newNextBtn.setAttribute("onclick", "changeImg(1)")
                newNextBtn.style.cssText = `right: ${calcImgToEdge}px`

                //Prev Btn
                let newPrevBtn = document.createElement("a")
                let btnPrevText = document.createTextNode("Prev")
                newPrevBtn.appendChild(btnPrevText)
                container.appendChild(newPrevBtn)
                newPrevBtn.setAttribute("class", "img-btn")
                newPrevBtn.id = "img-btn-prev"
                newPrevBtn.setAttribute("onclick", "changeImg(0)")
                newPrevBtn.style.cssText = `left: ${calcImgToEdge}px`

                //Close Btn
                let closeBtn = document.createElement("button")
                let closeBtnText = document.createTextNode("x")
                closeBtn.appendChild(closeBtnText)
                container.appendChild(closeBtn)
                closeBtn.setAttribute("class", "close close_img")
                closeBtn.id = "img-btn-close"
                closeBtn.setAttribute("onclick", "closeImg()")
                closeBtn.style.cssText = `right: ${calcImgToEdge + 50}px; top: ${calcImgtoTop + 70}px`
            }

            //Use left and right arrow keys to navigate gallery
            document.body.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    changeImg(e)
                }  
            })
            
        })
    })
}

//Close lightbox
closeImg = () => {
    document.querySelector(".img-window").remove()
    document.querySelector("#img-btn-next").remove()
    document.querySelector("#img-btn-prev").remove()
    document.querySelector("#img-btn-close").remove()
}

//Change imgs
changeImg = (changeDirection) => {
    //delete current img
    document.querySelector("#current-img").remove()
    //get new img
    let getImgWindow = document.querySelector(".img-window")
    let newImg = document.createElement("img")
    getImgWindow.appendChild(newImg)

    let calcNewImg
    if (changeDirection === 1 || changeDirection.key === 'ArrowRight') {
        calcNewImg = getLatestOpenedImg + 1
        if (calcNewImg > galleryImg.length) {
            calcNewImg = 1
        }
    } else if (changeDirection === 0 || changeDirection.key === 'ArrowLeft') {
        calcNewImg = getLatestOpenedImg - 1 
        if(calcNewImg < 1) {
            calcNewImg = galleryImg.length
        }
    } 

    newImg.setAttribute("src", `../media/img-${calcNewImg}.JPG`)
    newImg.setAttribute("id", "current-img")

    getLatestOpenedImg = calcNewImg

    newImg.onload = function () {
        let imgWidth = this.width
        let imgHeight = this.height
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80
        let calcImgtoTop = ((windowHeight - imgHeight) /2) - 80

        let nextBtn = document.querySelector("#img-btn-next")
        nextBtn.style.cssText = `right: ${calcImgToEdge}px`

        let prevBtn = document.querySelector("#img-btn-prev")
        prevBtn.style.cssText = `left: ${calcImgToEdge}px`

        let closeBtn = document.querySelector("#img-btn-close")
        closeBtn.style.cssText = `right: ${calcImgToEdge + 50}px; top: ${calcImgtoTop + 70}px`
    }

}

// Toggle navbar 
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-ul")
const links = document.querySelectorAll(".nav-ul li")

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open")
    links.forEach(link => {
        link.classList.toggle("fade")
    })
})


