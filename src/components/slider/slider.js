export class HeroSlider {
    constructor() {
    
        this.timeBetweenSlides = 24000;
        this.bannerWidth;
        this.stepWidth;
        this.unit = "px";
               
        this.angles = [
            document.querySelector('.slider .slider_angle-switch--left'),
            document.querySelector('.slider .slider_angle-switch--right')
        ];

        this.dotsBelt = document.querySelector('.slider .slider_dots-switch');
        this.dots = [];

        this.slider = document.querySelector('.slider_gallery');
        this.banners = document.querySelectorAll('.slider_item');
        this.slidePositions = this.banners.length;
        this.maxPositionIndex = -(this.slidePositions - 1);
        this.currentPositionIndex = 0;
        this.direction = -1;
        
        this.timer = setInterval(() => {
            this.slide()
        }, this.timeBetweenSlides);

        
        this.printDots();
        this.angleClick(-1);
        this.angleClick(1);
        this.dotClick();
        this.swipeEvent();

        this.prepareSlider();
        this.listenToChange();
    }

    prepareSlider(){
        //prevent positions
        clearInterval(this.timer);
        this.currentPositionIndex = 0;
        this.direction = -1;
        this.slider.style.left = 0+this.unit;
        
        //check if need to work
        let isSlider = window.getComputedStyle(document.querySelector('.slider_gallery')).getPropertyValue('position');
        console.log(isSlider);
        if (isSlider!='relative'){return};

        this.timer = setInterval(() => {
            this.slide()
        }, this.timeBetweenSlides);
        //set values
        let bannerStyles = window.getComputedStyle(document.querySelectorAll('.slider_item')[0]);
        let bannerWidth = bannerStyles.getPropertyValue('width');
        let numericWidth = parseInt(bannerWidth);  
        this.stepWidth = numericWidth; 
        this.slider.style.width=`${(this.banners.length*3*numericWidth)+this.unit}`;
    }

    listenToChange(){
        window.addEventListener('resize', () => {
            this.prepareSlider();
        });
    }

    swipeEvent() {
        var touchEnded, touchStarted;
        let touchArea = document.querySelector('.slider_gallery');
        touchArea.addEventListener('touchstart', e => handleTouchStart(e), false);
        touchArea.addEventListener('touchend', e => handleTouchEnd(e), false);
        const handleTouchStart = (e) => {
            touchStarted = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            touchEnded = e.changedTouches[0].clientX;
            if (touchStarted - touchEnded > 20) {
                this.actionOnAngleClickOrSwipe(-1);
            } else if (touchStarted - touchEnded < -20) {
                this.actionOnAngleClickOrSwipe(1);
            }
        }
    }

    actionOnAngleClickOrSwipe(dir) {
        
        this.direction = dir;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.slide()
        }, this.timeBetweenSlides);
        if (dir === -1 && this.currentPositionIndex === this.maxPositionIndex) {
            this.banners[this.currentPositionIndex * -1].classList.add('slider_item--slide-fail');
            setTimeout(() => {
                this.banners[this.currentPositionIndex * -1].classList.remove('slider_item--slide-fail')
            }, 100);
            return;
        } else if (dir === 1 && this.currentPositionIndex === 0) {
            this.banners[this.currentPositionIndex * -1].classList.add('slider_item--slide-fail');
            setTimeout(() => {
                this.banners[this.currentPositionIndex * -1].classList.remove('slider_item--slide-fail')
            }, 100);
            return;
        }
        this.slide();
    }

    angleClick(dir) {
        let currentAngle = dir === 1 ? this.angles[1] : this.angles[0];
        currentAngle.addEventListener('click', () => {
            this.actionOnAngleClickOrSwipe(dir)
        });
    }

    dotClick() {
        this.dots.forEach((item, idx) => {
            item.addEventListener('click', () => {
                clearInterval(this.timer);
                this.currentPositionIndex = -idx + (this.direction * -1);
                this.slide();
                this.timer = setInterval(() => {
                    this.slide()
                }, this.timeBetweenSlides);
            });
        })
    }

    slide() {
        this.direction = this.currentPositionIndex === this.maxPositionIndex ? 1 : this.direction;
        this.direction = this.currentPositionIndex === 0 ? -1 : this.direction;
        this.currentPositionIndex = this.currentPositionIndex + this.direction;
        this.slider.style.left = `${(this.currentPositionIndex)*this.stepWidth+this.unit}`;

        this.markCurrentDot();
    }

    markCurrentDot() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].classList.remove('slider_dots-switch_dot--active');
        }
        this.dots[this.currentPositionIndex * -1].classList.add('slider_dots-switch_dot--active');
    }

    printDots() {
        let dotsAmount = this.slidePositions;
        for (let i = 0; i < dotsAmount; i++) {
            let dot = document.createElement('DIV');
            dot.classList.add('slider_dots-switch_dot');
            if (i === 0) dot.classList.add('slider_dots-switch_dot--active');
            this.dotsBelt.appendChild(dot);
            this.dots.push(dot);
        }
    }
}

