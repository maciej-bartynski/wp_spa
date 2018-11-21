import jquery from 'jquery';
class Navigation {
    constructor(){
        this.angleUp=jquery('#angle-up');
        this.angleDown=jquery('#angle-down');
        this.navi = jquery('#navigation');
        this.toggleNavigation();
    }

    toggleNavigation(){
        this.angleUp.click(()=>{
            this.navi.addClass('navi-hidden');
        });
        this.angleDown.click(() => {
            this.navi.removeClass('navi-hidden');
        });
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    let navi=new Navigation;
});