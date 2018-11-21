import jquery from 'jquery';
import TweenMax, {
    TimelineMax
} from 'gsap/TweenMax';

class BackgroundAnimation {
    constructor(){
        this.svgo = document.getElementById('svg-object').contentDocument;
        this.svgo = jquery(this.svgo);
        console.log(this.svgo);
        //declare several elements
        this.firstElement =this.svgo.find('.background-svg-1-first-clock-bigger');
        this.secondElement =this.svgo.find('.background-svg-1-second-clock-smaller');
        this.thirdElement =this.svgo.find('.background-svg-1-first-wheel');
        this.fourthElement =this.svgo.find('.background-svg-1-second-wheel');
        this.fifthElement =this.svgo.find('.background-svg-1-third-wheel');
        this.sixthElement =this.svgo.find('.background-svg-1-fourth-wheel');
        this.seventhElement =this.svgo.find('.background-svg-1-big-cog');
        
        this.ninthElement =this.svgo.find('#background-svg1-corb');
        this.eighthElement =this.svgo.find('#background-svg1-corbwheel');

        //declare only one timeline for all elements
        this.onlyOneTimeline = new TimelineMax({repeat: -1});
        this.onlyOneTimeline.pause(true);
        //create several tweens
        this.createTween(this.firstElement,3, 0);
        this.createTween(this.secondElement,2.5, 0.5);
        this.createTween(this.thirdElement,1.5, 0.6);
        this.createTween(this.fourthElement, 0.5, 0.6);
        this.createTween(this.fifthElement, 1.5, 0.6);
        this.createTween(this.sixthElement, 2.6, 1);
        this.createTween(this.seventhElement, 5, 2);
        this.createTween(this.eighthElement, 3, 2.5);
        this.createTween(this.ninthElement, 3, 2.5);
        
        //run timeline
        this.onlyOneTimeline.resume();
    }
    createTween(el, last, add){
        let origin = el === this.ninthElement? '50% 0%' : '50% 50%';
        let tween = TweenMax.to(
            el,
            last,
            {
                rotation: 360,
                ease: Back.easeInOut,
                transformOrigin: origin,
            }
        )
        this.onlyOneTimeline.add(tween, add);
    }
}


window.addEventListener('load', ()=>{
    var bgAnimation = new BackgroundAnimation
})

