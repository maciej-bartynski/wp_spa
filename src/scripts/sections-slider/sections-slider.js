import jquery from 'jquery';

class BlobMovements {
    constructor(){
        this.sectionsWrapper = jquery('.sections-wrapper');
        this.sectionsItem = jquery('.sections-wrapper_item');
        this.sectionsContent = jquery('.sections-wrapper_content');
        this.naviItems = jquery('.navigation--item');
        this.navi = jquery('.navigation--container');

        this.isMouseOver=false;
        this.currentSection=null;

        this.showBlobOnMouseOverNaviItem = this.showBlobOnMouseOverNaviItem.bind(this);
        this.hideBlobOnMouseOutNaviItem = this.hideBlobOnMouseOutNaviItem.bind(this);
        this.changeSectionOnClickOnNaviItem = this.changeSectionOnClickOnNaviItem.bind(this);
        this.checkIfMouseIsOverNav();
        this.mouseOverDispatcher();
        this.clickDispatchter();

        this.changeSectionOnClickOnNaviItem(0, true);
    }

    

    //events
    clickDispatchter(){
        let dispatchingContext = this.changeSectionOnClickOnNaviItem;
        let naviItems = this.naviItems;
        this.naviItems.each(
            function (index) {
                let currentItem = jquery(this);
                currentItem.click(() => {
                    naviItems.removeClass('active');
                    currentItem.addClass('active');
                    dispatchingContext(index);
                });
            }
        );
    }

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

    //methods

    showBlobOnMouseOverNaviItem(num){
        let currentSection = this.currentSection;
        let isMouseHere = this.isMouseOver;
        this.sectionsItem.each(
            function(idx){  
                if (currentSection === idx )return true;
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
        let currentSection = this.currentSection;
        this.sectionsItem.each(function (index) {
            if (currentSection===index)return true;
            let currentItem = jquery(this);
            index===num?currentItem.find('.sections-wrapper_content').css('display', 'none'):null;
            currentItem.removeClass('sections-wrapper_item--shadow');
        });
    }

    checkIfMouseIsOverNav (){
        this.navi.mouseleave(()=>{
            this.isMouseOver=false;
            let currentSection = this.currentSection;
            this.sectionsItem.each(
                function(index){
                    if (index!==currentSection){
                        jquery(this).fadeOut(100);
                        jquery(this).removeClass('sections-wrapper_item--bigger');
                    }
                }
            );
        });
    }

    changeSectionOnClickOnNaviItem(num, ini=null){
        let currentSectionSet = (x)=>{this.currentSection=x};
        this.sectionsItem.each(function (index) {
            let currentItem = jquery(this);
            currentItem.removeClass("sections-wrapper_item--active");
            currentItem.removeClass('sections-wrapper_item--shadow');
            currentItem.removeClass("sections-wrapper_item--bigger");
            if (index === num) {
                currentSectionSet(num);
                currentItem.addClass('sections-wrapper_item--active');
                if (ini) {
                    currentItem.fadeIn(1);
                    currentItem.find('.sections-wrapper_content').fadeIn(100);
                }
                console.log(ini)
                return true;
            }
            currentItem.fadeOut(1);
        });
        this.isMouseOver =false;
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    let blobMovements=new BlobMovements;
});