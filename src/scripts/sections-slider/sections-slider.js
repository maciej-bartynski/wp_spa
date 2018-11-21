import jquery from 'jquery';

class BlobMovements {
    constructor(){
        this.blob = jquery('#sections-blob');
        this.slider = jquery('#sections-slider');
        this.container = jquery('#sections--wrapper');
        this.naviItems = document.querySelectorAll('.navigation--item');
        this.scrollingState = document.querySelectorAll('.scrolling-state');
        this.currentSectionContainer = document.querySelector('#current-section-container');
        this.currentlyDispalyedNum=null;

        this.amountOfCells;
        this.sliderStep;
        this.setScrollingStages();
        
        this.timer;
        this.containerHidden=true;
        this.onMouseOver();

        //ini:
        this.showTheSec(0);
    }

    setScrollingStages(){
        let amountOfCells = this.scrollingState.length-1;
        let stateWidth = 100/amountOfCells;
        let sliderStep = (stateWidth * 100 / 20);

        this.slider.css('grid-template-columns', `repeat(${amountOfCells + ', ' + stateWidth }%`);
        this.sliderStep=sliderStep;
        this.amountOfCells = amountOfCells;
    }

    onMouseOver(){
        for (let i=0; i<=this.amountOfCells;i++){

            this.naviItems[i].addEventListener('click', () => {
                this.showTheSec(i);
            })
            
            this.naviItems[i].addEventListener('mouseover', ()=>{
                this.moveTheBlob(i);
            })
            
            this.naviItems[i].addEventListener('mouseout', ()=>{
                this.timer=setTimeout(()=>{
                    this.container.fadeOut('slow');
                    this.containerHidden=true;
                }, 1000);
            })

        }
    }

    moveTheBlob(num){
        
        if (num > this.currentlyDispalyedNum && this.currentlyDispalyedNum!==null) {
            num -= 1;
        } else if (num === this.currentlyDispalyedNum) {
            return;
        }

        clearTimeout(this.timer);

        if (this.containerHidden) {
            this.container.fadeIn();
            this.containerHidden = false;
        }

        //let x=`${num*(75/this.amountOfCells)}%`;
        var z = `${num}vw`;
        if (num >= this.amountOfCells / 2){
            z = `${this.amountOfCells - num}vw`
        }
        let x = `${num}vw`;
        let y=`${num*-this.sliderStep}%`;
        this.blob.css('left', z);
        this.container.css('top', x);
        this.slider.css('left', y);
    }

    showTheSec(num){
        
        clearTimeout(this.timer);
        this.container.fadeOut('200');
        this.containerHidden = true;
     
        let currentlyDisplayed = this.currentSectionContainer.querySelector('.section-content--wrapper');
        if (currentlyDisplayed) {
            this.scrollingState[this.currentlyDispalyedNum].style.display='block';
            this.scrollingState[this.currentlyDispalyedNum].appendChild(currentlyDisplayed);
            this.naviItems[this.currentlyDispalyedNum].classList.remove('active');
        }
        
        let clickedSec = this.scrollingState[num].querySelector('.section-content--wrapper');
        this.scrollingState[num].style.display='none';
        this.currentSectionContainer.appendChild(clickedSec);
        this.naviItems[num].classList.add('active');
        this.currentlyDispalyedNum=num;
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    let blobMovements=new BlobMovements;
});