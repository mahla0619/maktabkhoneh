                           /* =========================
     Main Slider
  ========================= */

                            let pos = 0;
                            const totalSlides = 4;
                            let autoPlayInterval = null;

                            const gal =
                                document.getElementById('gal');

                            const rightBtn =
                                document.getElementById('rightBtn');

                            const leftBtn =
                                document.getElementById('leftBtn');

                            const bullets =
                                document.querySelectorAll('#but li');

                            const slider =
                                document.getElementById('slider');


                            function moveTo(index) {

                                if (index < 0) {
                                    index = totalSlides - 1;
                                }

                                if (index >= totalSlides) {
                                    index = 0;
                                }

                                pos = index;

                                /*
                                   هر بار دقیقاً یک اسلاید
                                   به اندازه 20 درصد حرکت می‌کند.
                                */
                                gal.style.left =
                                    -(pos * 100) + '%';


                                /*
                                   مشخص کردن اسلاید فعلی
                                */
                                bullets.forEach((li, i) => {

                                    li.classList.toggle(
                                        'active',
                                        i === pos
                                    );

                                });
                            }


                            function move(index) {
                                moveTo(index);
                            }


                            /* راست = اسلاید قبلی */

                            rightBtn.onclick = function () {
                                moveTo(pos + 1);
                            };

                            leftBtn.onclick = function () {
                                moveTo(pos - 1);
                            };


                            /* =========================
                               Auto Play
                            ========================= */

                            function startAutoPlay() {

                                clearInterval(autoPlayInterval);

                                autoPlayInterval =
                                    setInterval(function () {

                                        moveTo(pos + 1);

                                    }, 3000);
                            }


                            /* توقف هنگام رفتن موس روی اسلایدر */

                            slider.addEventListener(
                                'mouseenter',
                                function () {

                                    clearInterval(
                                        autoPlayInterval
                                    );

                                }
                            );


                            /* ادامه بعد از خارج شدن موس */

                            slider.addEventListener(
                                'mouseleave',
                                function () {

                                    startAutoPlay();

                                }
                            );


                            /* شروع از اسلاید اول */

                            moveTo(0);

                            startAutoPlay();

                            /* =========================
                               Header Scroll
                            ========================= */

                            const header =
                                document.getElementById("header");

                            let lastScrollY =
                                window.scrollY;


                            window.addEventListener("scroll", function () {

                                const currentScrollY =
                                    window.scrollY;


                                if (currentScrollY <= 0) {

                                    header.classList.remove(
                                        "scroll-header"
                                    );

                                    header.classList.remove(
                                        "show-menu"
                                    );

                                }

                                else if (currentScrollY > lastScrollY) {

                                    header.classList.add(
                                        "scroll-header"
                                    );

                                    header.classList.remove(
                                        "show-menu"
                                    );

                                }

                                else {

                                    header.classList.add(
                                        "scroll-header"
                                    );

                                    header.classList.add(
                                        "show-menu"
                                    );
                                }


                                lastScrollY = currentScrollY;

                            });



                            /* =========================
                               Course Sliders
                            ========================= */

                            function createSlider(
                                slider,
                                nextButton,
                                previousButton,
                                step,
                                getVisible
                            ) {

                                if (
                                    !slider ||
                                    !nextButton ||
                                    !previousButton
                                ) {
                                    return;
                                }


                                const boxes =
                                    Array.from(
                                        slider.querySelectorAll('.box')
                                    );


                                if (!boxes.length) {
                                    return;
                                }


                                let page = 0;


                                function update() {

                                    const visible =
                                        getVisible
                                            ? getVisible()
                                            : step;


                                    const totalPages =
                                        Math.max(
                                            0,
                                            Math.ceil(
                                                boxes.length / visible
                                            ) - 1
                                        );


                                    if (page > totalPages) {
                                        page = totalPages;
                                    }


                                    if (page < 0) {
                                        page = 0;
                                    }


                                    const boxWidth =
                                        boxes[0].getBoundingClientRect().width;


                                    const sliderStyle =
                                        window.getComputedStyle(slider);


                                    const gap =
                                        parseFloat(
                                            sliderStyle.gap
                                        ) || 10;


                                    const lastPageMove =
                                        Math.max(
                                            0,
                                            boxes.length - visible
                                        );


                                    const move =
                                        Math.min(
                                            page * visible,
                                            lastPageMove
                                        ) *
                                        (boxWidth + gap);


                                    slider.style.transform =
                                        `translateX(${move}px)`;


                                    previousButton.style.opacity =
                                        page > 0
                                            ? '1'
                                            : '0.4';


                                    previousButton.style.pointerEvents =
                                        page > 0
                                            ? 'auto'
                                            : 'none';


                                    nextButton.style.opacity =
                                        page < totalPages
                                            ? '1'
                                            : '0.4';


                                    nextButton.style.pointerEvents =
                                        page < totalPages
                                            ? 'auto'
                                            : 'none';
                                }


                                nextButton.onclick = function () {

                                    const visible =
                                        getVisible
                                            ? getVisible()
                                            : step;


                                    const totalPages =
                                        Math.max(
                                            0,
                                            Math.ceil(
                                                boxes.length / visible
                                            ) - 1
                                        );


                                    if (page < totalPages) {
                                        page++;
                                        update();
                                    }
                                };


                                previousButton.onclick = function () {

                                    if (page > 0) {
                                        page--;
                                        update();
                                    }
                                };


                                update();


                                window.addEventListener(
                                    'resize',
                                    update
                                );
                            }



                            /* =========================
                               محبوب‌ترین دوره‌ها
                            ========================= */

                            createSlider(

                                document.querySelector(
                                    '.favirit .miniSlider'
                                ),

                                document.getElementById(
                                    'miniLeftBtn'
                                ),

                                document.getElementById(
                                    'miniRightBtn'
                                ),

                                4,

                                function () {

                                    if (window.innerWidth <= 768) {
                                        return 1;
                                    }

                                    if (window.innerWidth <= 992) {
                                        return 3;
                                    }

                                    return 4;
                                }
                            );



                            /* =========================
    دانشگاهی
 ========================= */

                            createSlider(

                                document.getElementById(
                                    'miniSlider2'
                                ),

                                document.getElementById(
                                    'miniLeftBtn2'
                                ),

                                document.getElementById(
                                    'miniRightBtn2'
                                ),

                                4
                            );
                            /* =========================
                                                          مسیرهای یادگیری
                                                       ========================= */

                            const categorySlider3 =
                                document.getElementById(
                                    'categorySlider3'
                                );


                            if (categorySlider3) {

                                const box1 =
                                    categorySlider3.querySelector(
                                        '.box1'
                                    );


                                const categories3 =
                                    box1
                                        ? Array.from(box1.children)
                                        : [];


                                const miniLeftBtn3 =
                                    document.getElementById(
                                        'miniLeftBtn3'
                                    );


                                const miniRightBtn3 =
                                    document.getElementById(
                                        'miniRightBtn3'
                                    );


                                let currentIndex3 = 0;


                                function updateMiniSlider3() {

                                    if (!categories3.length) {
                                        return;
                                    }


                                    const itemWidth =
                                        categories3[0]
                                            .getBoundingClientRect()
                                            .width;


                                    const boxStyle =
                                        window.getComputedStyle(
                                            box1
                                        );


                                    const gap =
                                        parseFloat(
                                            boxStyle.gap
                                        ) || 10;


                                    const containerWidth =
                                        categorySlider3
                                            .getBoundingClientRect()
                                            .width;


                                    const visible =
                                        Math.max(
                                            1,
                                            Math.floor(
                                                containerWidth /
                                                (itemWidth + gap)
                                            )
                                        );


                                    const maxIndex =
                                        Math.max(
                                            0,
                                            categories3.length - visible
                                        );


                                    if (currentIndex3 > maxIndex) {
                                        currentIndex3 = maxIndex;
                                    }


                                    const move =
                                        currentIndex3 *
                                        (itemWidth + gap);


                                    box1.style.transform =
                                        `translateX(${move}px)`;


                                    miniRightBtn3.style.opacity =
                                        currentIndex3 > 0
                                            ? '1'
                                            : '0.4';


                                    miniRightBtn3.style.pointerEvents =
                                        currentIndex3 > 0
                                            ? 'auto'
                                            : 'none';


                                    miniLeftBtn3.style.opacity =
                                        currentIndex3 < maxIndex
                                            ? '1'
                                            : '0.4';


                                    miniLeftBtn3.style.pointerEvents =
                                        currentIndex3 < maxIndex
                                            ? 'auto'
                                            : 'none';
                                }


                                miniLeftBtn3.onclick = function () {

                                    const itemWidth =
                                        categories3[0]
                                            .getBoundingClientRect()
                                            .width;


                                    const boxStyle =
                                        window.getComputedStyle(
                                            box1
                                        );


                                    const gap =
                                        parseFloat(
                                            boxStyle.gap
                                        ) || 10;


                                    const containerWidth =
                                        categorySlider3
                                            .getBoundingClientRect()
                                            .width;


                                    const visible =
                                        Math.max(
                                            1,
                                            Math.floor(
                                                containerWidth /
                                                (itemWidth + gap)
                                            )
                                        );


                                    const maxIndex =
                                        Math.max(
                                            0,
                                            categories3.length - visible
                                        );


                                    if (currentIndex3 < maxIndex) {
                                        currentIndex3++;
                                        updateMiniSlider3();
                                    }
                                };


                                miniRightBtn3.onclick = function () {

                                    if (currentIndex3 > 0) {
                                        currentIndex3--;
                                        updateMiniSlider3();
                                    }
                                };


                                updateMiniSlider3();


                                window.addEventListener(
                                    'resize',
                                    updateMiniSlider3
                                );
                            }
                            /* =========================
                                      Theme
                                      ========================= */

                            const themeToggle = document.getElementById("themeToggle");
                            const themeIcon = themeToggle?.querySelector(".theme-icon");

                            if (themeToggle && themeIcon) {

                                themeToggle.addEventListener("click", () => {

                                    document.body.classList.toggle("dark");

                                    const isDark =
                                        document.body.classList.contains("dark");

                                    themeIcon.textContent =
                                        isDark ? "☾" : "☀";

                                    localStorage.setItem(
                                        "theme",
                                        isDark ? "dark" : "light"
                                    );
                                });


                                const savedTheme =
                                    localStorage.getItem("theme");

                                if (savedTheme === "dark") {

                                    document.body.classList.add("dark");

                                    themeIcon.textContent = "☾";
                                }
                            }
