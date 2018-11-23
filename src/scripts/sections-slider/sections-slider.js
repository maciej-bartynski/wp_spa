import jquery from 'jquery';

class BlobMovements {
    constructor(){
        this.sectionsWrapper = jquery('.sections-wrapper');
        this.sectionsItem = jquery('.sections-wrapper_item');
        this.sectionsContent = jquery('.sections-wrapper_content');
        this.naviItems = jquery('.navigation--item');
        this.navi = jquery('.navigation--container');

        this.isMouseOver=false;
               
        //this.blob = jquery('#sections-blob');
        //this.container = jquery('#sections--wrapper');
        //this.naviItems = document.querySelectorAll('.navigation--item');
        //this.scrollingState = document.querySelectorAll('.scrolling-state');
        //this.currentSectionContainer = document.querySelector('#current-section-container');
        //this.currentlyDispalyedNum=null;

        //this.amountOfCells;
        //this.sliderStep;
        //this.setScrollingStages();
        
        //this.timer;
        //this.containerHidden=true;
        //this.onMouseOver();

        //ini:
        //this.showTheSec(0);
        this.showBlobOnMouseOverNaviItem = this.showBlobOnMouseOverNaviItem.bind(this);
        this.hideBlobOnMouseOutNaviItem = this.hideBlobOnMouseOutNaviItem.bind(this);
        this.checkIfMouseIsOverNav();
        this.mouseOverDispatcher();
    }

    //events
    mouseOverDispatcher(){
        let dispatchingContext = this.showBlobOnMouseOverNaviItem;
        let dispatchingContextB = this.hideBlobOnMouseOutNaviItem;
        this.naviItems.each(
            function (index) {
                jquery(this).hover(()=>{
                    dispatchingContext(index);
                },()=>{
                    dispatchingContextB(index);
                });
            }
        );
    }

    showBlobOnMouseOverNaviItem(num){
        //if is mouse over, bigger all
        let isMouseHere = this.isMouseOver;
        this.sectionsItem.each(
            function(idx){  
                let currentItem = jquery(this);
                if(idx===num){
                    currentItem.addClass('sections-wrapper_item--shadow');
                    currentItem.find('.sections-wrapper_content').fadeIn(100);
                }
                if(isMouseHere===false){
                    currentItem.fadeIn(1);
                    let top = jquery(this).position().top;
                    let left = jquery(this).position().left;
                    currentItem.find('.sections-wrapper_content').css('top', -top + 'px');
                    currentItem.find('.sections-wrapper_content').css('left', -left + 'px');
                    currentItem.addClass('sections-wrapper_item--bigger');
                }
            }
        )
        this.isMouseOver=true;
    }

    hideBlobOnMouseOutNaviItem(num){
        this.sectionsItem.each(function (index) {
            let currentItem = jquery(this);
            index===num?currentItem.find('.sections-wrapper_content').css('display', 'none'):null;
            currentItem.removeClass('sections-wrapper_item--shadow');
        });
    }

    checkIfMouseIsOverNav (){
        this.navi.mouseleave(()=>{
            this.isMouseOver=false;
            console.log('over')
            this.sectionsItem.each(
                function(index){
                    jquery(this).fadeOut(100);
                    jquery(this).removeClass('sections-wrapper_item--bigger');
                }
            );
        });
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    let blobMovements=new BlobMovements;
});