function Freedrag(container) {

    this.container = document.querySelector(container);
    this.inner = this.container.querySelector('.freedrag__inner');

    this.init = () => {

        this.container.style.position = 'relative';
        this.inner.style.position = 'absolute';

        this.innerHeight = window.getComputedStyle(this.inner).height;
        this.container.style.height = this.innerHeight;

        this.containerWidth = window.getComputedStyle(this.container).width;
        this.innerWidth = window.getComputedStyle(this.inner).width;

        this.max = 0;
        this.min = (-(parseInt(this.innerWidth, 10) - parseInt(this.containerWidth, 10)));

        this.currentX;
        this.initialX;
        this.departurePoint;
        this.arrivalPoint;
        this.xOffset = 0;

        this.inner.style.transform = 'translateX(' + this.xOffset + ')';
    }

    this.dragStart = (e) => {
        if (e.type == 'mousedown') {
            this.departurePoint = e.clientX;
            this.initialX = e.clientX - this.xOffset;
            this.container.addEventListener('mousemove', this.drag, false)
            this.container.addEventListener('mouseleave', this.dragEnd, false)
        } else if (e.type == 'touchstart') {
            this.departurePoint = e.touches[0].clientX;
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.container.addEventListener('touchmove', this.drag, false)
            this.container.addEventListener('touchcancel', this.dragEnd, false);
        }
    }

    this.dragEnd = (e) => {

        if (e.type == 'mouseup' || e.type == 'mouseleave') {
            this.arrivalPoint = e.clientX;
        } else if (e.type == 'touchend' || e.type == 'touchcancel') {
            this.arrivalPoint = e.changedTouches[0].clientX;
        }

        this.container.removeEventListener('mousemove', this.drag, false);
        this.container.removeEventListener('touchmove', this.drag, false);

        this.container.removeEventListener('mouseleave', this.dragEnd, false)
        this.container.removeEventListener('touchcancel', this.dragEnd, false);


        if (this.currentX < this.min) {

            this.currentX = this.min;
            this.xOffset = this.currentX;

            this.inner.style.transition = 'transform 320ms ease-out';
            this.inner.style.transform = 'translateX(' + this.min + 'px)';

            setTimeout(() => { this.inner.style.transition = "none" }, 320);

        } else if (this.currentX > this.max) {

            this.currentX = this.max;
            this.xOffset = this.currentX;

            this.inner.style.transition = 'transform 320ms ease-out';
            this.inner.style.transform = 'translateX(' + this.max + 'px)';

            setTimeout(() => { this.inner.style.transition = "none" }, 320);
        } else {

            if (this.departurePoint > this.arrivalPoint) {
                this.currentX = this.currentX - 70;
                this.xOffset = this.currentX;
                this.inner.style.transition = 'transform 320ms ease-out';
                this.setTranslate();
                setTimeout(() => { this.inner.style.transition = "none" }, 320);
            } else if (this.departurePoint < this.arrivalPoint) {
                this.currentX = this.currentX + 70;
                this.xOffset = this.currentX;
                this.inner.style.transition = 'transform 320ms ease-out';
                this.setTranslate();
                setTimeout(() => { this.inner.style.transition = "none" }, 320);
            }
        }
        this.initialX = this.currentX;
    }

    this.drag = (e) => {

        if (e.type == 'mousemove') {

            e.preventDefault();

            this.currentX = e.clientX - this.initialX;

        } else if (e.type == 'touchmove') {

            this.currentX = e.touches[0].clientX - this.initialX;

        }

        this.xOffset = this.currentX;

        this.setTranslate();
    }

    this.setTranslate = () => {
        if (this.xOffset > this.min - 300 && this.xOffset < this.max + 300) {
            this.inner.style.transform = 'translateX(' + this.xOffset + 'px)';
        }
    }

    this.onResize = () => {
        if (window.getComputedStyle(this.container).width != this.containerWidth) {
            this.init();
        }
    }

    this.init();

    this.container.addEventListener("mousedown", this.dragStart, false);
    this.container.addEventListener("touchstart", this.dragStart, false);

    this.container.addEventListener("mouseup", this.dragEnd, false);
    this.container.addEventListener("touchend", this.dragEnd, false);

    window.addEventListener('resize', this.onResize);
}