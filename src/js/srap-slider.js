class SrapSlider {
    
    constructor (speed = 1, timingFunction = 'ease-in-out') {
        this.sliderInit(speed, timingFunction);
        this.indicatorsInit();
        this.addEvent();
    }

    sliderInit(speed, timingFunction) {
        this.srapSlider = document.querySelector('.srap-slider');
        this.prevBtn = document.querySelector('.prevBtn');
        this.nextBtn = document.querySelector('.nextBtn');
        this.slides = document.querySelectorAll('.srap-slider .slide');
        this.activeIndex = 0;
        this.slideDirection = 'toRight';
        this.slideSpeed = speed; // second
        this.timeoutDuration = speed * 1000 + 100;

        for(let slide of this.slides) {
            slide.style.transitionDuration = `${this.slideSpeed}s`;
            slide.style.animationDuration = `${this.slideSpeed}s`;
            slide.style.transitionTimingFunction = `${timingFunction}`;
            slide.style.animationTimingFunction = `${timingFunction}`;
        }

        // this.sliderAutoSlide();
    }

    // sliderAutoSlide() {
    //     this.autoSlide = setInterval(() => {
    //         this.toRight();
    //     }, 4000);
    // }

    indicatorsInit() {
        this.sliderIndicators = document.querySelector('.slider-indicators');
        let indicatorsHTML = '';
        for(let i = 0; i < this.slides.length; i++) {
            indicatorsHTML += `<li class="indicator" data-indicator-index="${i}"></li>`;
        }
        this.sliderIndicators.innerHTML = indicatorsHTML;
        this.indicators = document.querySelectorAll('.indicator');
        this.indicators[this.activeIndex].classList.add('indicator-active');
    }

    addEvent() {
        this.toRight = this.toRight.bind(this);
        this.toLeft = this.toLeft.bind(this);
        this.indicatorsClick = this.indicatorsClick.bind(this);

        this.nextBtn.addEventListener('click', this.toRight);
        this.prevBtn.addEventListener('click', this.toLeft);
        for(let indicator of this.indicators) {
            indicator.addEventListener('click', this.indicatorsClick);
        }
    }

    removeEvent() {
        this.nextBtn.removeEventListener('click', this.toRight);
        this.prevBtn.removeEventListener('click', this.toLeft);
        for(let indicator of this.indicators) {
            indicator.removeEventListener('click', this.indicatorsClick);
        }
    }

    toRight() {
        // clearInterval(this.autoSlide);
        this.slideDirection = 'toRight';
        this.changeIndicator(this.activeIndex);
        this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev', 'active-next');
        this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next', 'active-prev');
        this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');
        this.slides[this.activeIndex].classList.add('active-prev');
        if(this.activeIndex === this.slides.length - 1) this.activeIndex = 0;
        else this.activeIndex++;
        this.slides[this.activeIndex].classList.add('active-from-right');
        this.removeEvent();
        setTimeout(() => {
            this.addEvent();
        }, this.timeoutDuration);
        // setTimeout(() => {
        //     this.autoSlide = setInterval(() => {
        //         this.toRight();
        //     }, 4000);
        // }, 4000);
    }

    toLeft() {
        // clearInterval(this.autoSlide);
        this.slideDirection = 'toLeft';
        this.changeIndicator(this.activeIndex);
        this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev');
        this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next');
        this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');
        this.slides[this.activeIndex].classList.add('active-next');
        if(this.activeIndex == 0) this.activeIndex = this.slides.length - 1;
        else this.activeIndex--;
        this.slides[this.activeIndex].classList.add('active-from-left');
        this.removeEvent();
        setTimeout(() => {
            this.addEvent();
        }, this.timeoutDuration);
        // setTimeout(() => {
        //     this.autoSlide = setInterval(() => {
        //         this.toRight();
        //     }, 4000);
        // }, 4000);
    }

    indicatorsClick(eventObject) {
        this.changeIndicator(eventObject);
        if(+eventObject.target.dataset.indicatorIndex == this.activeIndex) return false;
        let toLeft = false;
        if(+eventObject.target.dataset.indicatorIndex < this.activeIndex) toLeft = true;
        this.slides[this.checkIndex(this.activeIndex - 1)].classList.remove('active-prev');
        this.slides[this.checkIndex(this.activeIndex + 1)].classList.remove('active-next');
        this.slides[this.activeIndex].classList.remove('active-default', 'active-from-right', 'active-from-left');
        if(!toLeft) {
            this.slides[this.activeIndex].classList.add('active-prev');
            this.activeIndex = +eventObject.target.dataset.indicatorIndex;
            this.slides[this.activeIndex].classList.remove('active-prev', 'active-next');
            this.slides[this.activeIndex].classList.add('active-from-right');
        }
        else {
            this.slides[this.activeIndex].classList.add('active-next');
            this.activeIndex = +eventObject.target.dataset.indicatorIndex;
            this.slides[this.activeIndex].classList.remove('active-prev', 'active-next');
            this.slides[this.activeIndex].classList.add('active-from-left');
        }
        this.removeEvent();
        setTimeout(() => {
            this.addEvent();
        }, this.timeoutDuration);
    }

    changeIndicator(eventObject) {
        if(typeof eventObject == 'object') {
            this.indicators[this.activeIndex].classList.remove('indicator-active');
            this.indicators[eventObject.target.dataset.indicatorIndex].classList.add('indicator-active');
        }
        else if(typeof eventObject == 'number') {
            this.indicators[this.activeIndex].classList.remove('indicator-active');
            (this.slideDirection == 'toRight') ? this.indicators[this.checkIndex(this.activeIndex + 1)].classList.add('indicator-active') : (this.slideDirection == 'toLeft') ? this.indicators[this.checkIndex(this.activeIndex - 1)].classList.add('indicator-active') : this.error = true;
        }
    }

    checkIndex(i) {
        if(i > this.slides.length - 1) return i - this.slides.length;
        else if(i < 0) return i + this.slides.length;
        else return i;
    }
}

new SrapSlider(1, 'ease-in-out');