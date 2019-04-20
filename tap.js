const tap = (el, cb) => {
    if (el && typeof el === 'object') {

        let startTime = 0;
        let endTime = 0;
        let isMove = false;

        el.addEventListener('touchstart', function (e) {
            startTime = e.timeStamp;
        });

        el.addEventListener('touchmove', function () {
            isMove = true;
        });

        el.addEventListener('touchend', function (e) {
            endTime = e.timeStamp;
            if (!isMove && endTime - startTime < 150) {
                cb && cb('tap');
            }
            isMove = false;
            startTime = endTime = 0;
        });
    }
};

const install = (Vue) => {
    if (install.installed) return null;

    Vue.directive('tap', {
        bind(el, binding) {
            let handler = binding.value;
            if (typeof handler !== 'function') {
                console.log('Event must be function!');
            } else {
                tap(el, handler);
            }
        }
    });

    if (typeof window !== 'undefined' && window.Vue) {
        install(Vue)
    }
};

export default install
