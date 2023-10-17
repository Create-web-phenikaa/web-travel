function lightBox() {
    const modalElement = document.getElementById("lightbox");
    let current = 0;

    if (!modalElement) return;

    const imgElement = document.getElementById("lightBoxImg");
    const prevElement = document.getElementById("lightBoxPrev");
    const nextElement = document.getElementById("lightBoxNext");
    const imgList = document.querySelectorAll('img[data-album="blog"]');

    if (!imgElement || !prevElement || !nextElement) return;

    function assignSrc(element) {
        imgElement.src = element.src;
    }

    function showModal() {
        const myModal = new bootstrap.Modal(modalElement);
        if (myModal) myModal.show();
    }

    document.addEventListener("click", (e) => {
        const { target } = e;

        if (target.tagName !== "IMG" || !target.dataset.album) return;

        current = [...imgList].findIndex((x) => x === target);

        assignSrc(target);
        showModal();
    });

    prevElement.addEventListener("click", () => {
        current = current - 1 + imgList.length;
        imgElement.src = imgList[current % imgList.length].src;
    });

    nextElement.addEventListener("click", () => {
        current = (current + 1) % imgList.length;
        imgElement.src = imgList[current].src;
    });
}

function getTodoList() {
    try {
        return JSON.parse(localStorage.getItem("todo_List"));
    } catch (error) {
        return [];
    }
}

function renderDataBlog(data) {
    if (!data) return;

    const template = document.getElementById("blogTemplate");

    const blogElement = template.content.firstElementChild.cloneNode(true);
    if (!blogElement) return;

    // title
    const titleElement = blogElement.querySelector('h2[data-id="title"]');
    if (titleElement) titleElement.textContent = data.title;
    const titleElement1 = blogElement.querySelector('h2[data-id="title1"]');
    if (titleElement1) titleElement1.textContent = data.title;

    const titleElement2 = blogElement.querySelector('h2[data-id="title2"]');
    if (titleElement2) titleElement2.textContent = data.title;

    // img
    const imgElement = blogElement.querySelector('img[data-id="img"]');
    if (imgElement) imgElement.src = data.url;
    const imgElement1 = blogElement.querySelector('img[data-id="img-1"]');
    if (imgElement1) imgElement1.src = data.url_1;

    const imgElement2 = blogElement.querySelector('img[data-id="img-2"]');
    if (imgElement2) imgElement2.src = data.url_2;

    // data

    const dateElement = blogElement.querySelector('p[data-id="date"]');
    if (dateElement) dateElement.textContent = data.date;
    const dateElement1 = blogElement.querySelector('p[data-id="date-1"]');
    if (dateElement1) dateElement1.textContent = data.date;

    const dateElement2 = blogElement.querySelector('p[data-id="date-2"]');
    if (dateElement2) dateElement2.textContent = data.date;

    // desc

    const descElement = blogElement.querySelector('p[data-id="desc"]');
    if (dateElement) descElement.textContent = data.desc;
    const descElement1 = blogElement.querySelector('p[data-id="desc-1"]');
    if (dateElement1) descElement1.textContent = data.desc_1 || data.desc;

    const descElement2 = blogElement.querySelector('p[data-id="desc-2"]');
    if (dateElement2) descElement2.textContent = data.desc_2 || data.desc;

    const ulElement = document.getElementById("ulList");

    ulElement.textContent = "";
    return ulElement.append(blogElement);
}

function clickBlog() {
    document.addEventListener("click", (e) => {
        const { target } = e;

        if (target.tagName !== "H2" || !target.dataset.title) return;

        handleFilterChange("blog", target.id);

        const url = new URLSearchParams(window.location.search);
        const data = getTodoList();
        const dataClick = data.filter(
            (x) =>
                Number.parseInt(x.id) === Number(url.get("blog") || target.id)
        );

        const ulElement = document.getElementById("ulList");

        ulElement.textContent = "";
        const liElement = renderDataBlog(dataClick[0]);
        ulElement.append(liElement);
    });
}

function handleFilterChange(filterName, filterChange) {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterChange);

    history.pushState({}, "", url);

    //
}

(() => {
    lightBox();

    const todoList = [
        {
            id: 1,
            title: "Taste-safe sensory nulla dignissim",

            date: "Play Spaces, Toddlers / January 21, 2021",
            url: "./assets/img/blog-12.jpg",
            url_1: "./assets/img/blog-4.png",
            url_2: "./assets/img/blog-20.jpg",
            desc: " Consectetur enim viverra etiam semper interdum amet faucibus gravida bibendum  nisl orci adipiscing ut in tristique diam bibendum turpis in nec nisi amet, acsit adipiscing egestas gravida accumsan elit id viverra dolor volutpat mauristortor odio diam nam sit et, sed in amet ultrices libero, posuere aliquet semper adipiscing turpis hendrerit id interdum elementum. …",
        },
        {
            id: "2",
            title: "Exploring the duis lacus turpis faucibus",
            date: " Preschools, Science",
            url: "./assets/img/blog-8.jpg",
            url_1: "./assets/img/blog-6.jpg",
            url_2: "./assets/img/blog-7.jpg",

            desc: "Ultrices ipsum tempor eget lectus etiam at vitae risus arcu malesuada ullamcorper urna faucibus egestas viverra faucibus sed mattis eu, faucibus velit nunc est felis, morbi orci, tristique convallis amet malesuada massa vitae tortor eu sed sit est orci semper Diam morbi hendrerit congue tortor sociis lacus libero mauris, viverra massa morbi adipiscing nulla montes, nunc lectus blandit eget lacinia fermentum volutpat lectus risus vel sit blandit sit amet consectetur malesuada tempus tristique non neque, ac amet magnis ac quam mauris eu pulvinar mauris, ipsum sit massa pellentesque ornare ut nibh congue quis massa velit velit dolor, massa consectetur diam et lectus neque in. Aliquam nec, in diam aliquet Sed curabitur in purus et tincidunt Aliquet nibh volutpat felis  Tincidunt nibh sed lectus odio a leo Pretium porta convallis potenti non in ipsum tortor, varius sagittis, vitae arcu cursus ullamcorper ornare quis nunc egestas maecenas ultrices massa amet elit, blandit egestas pretium rutrum tempor iaculis interdum ornare placerat proin imperdiet at nulla scelerisque dis dui massa vulputate cras lorem sed id ornare accumsan magna elementum ut nulla tincidunt convallis nunc in et.",
        },
        {
            id: "3",
            title: "How to improve venenatis ultrices nulla",
            date: "By Mukul Aryan / January 21, 2021",
            url: "./assets/img/blog-11.png",
            url_1: "./assets/img/blog-4.png",
            url_2: "./assets/img/blog-5.jpg",

            desc: "Donec molestie enim vitae id tempus etiam malesuada consectetur eget aenean purus lacus, nunc ipsum tincidunt fermentum viverra et massa etiam in a mi dui sed sed sit est at magnis nam amet risus sed non ut malesuada sed congue cras urna feugiat cras purus, eget mauris purus tristique leo nisl, donec elit eget blandit arcu aliquam libero faucibus turpis dignissim donec magnis tincidunt.",
        },
        {
            id: "4",
            title: "Places",
            url: "./assets/img/blog-9.jpg",
            url_1: "./assets/img/blog-10.jpg",
            url_2: "./assets/img/blog-12.jpg",
            desc: "The Tiger’s Nest Monastery hike is one of the best things to do in Bhutan, and probably one of the most amazing day hikes anywhere in the world.",
            desc_1: "The Tiger’s Nest hike is not too difficult for most people of average fitness, and it’s located fairly close to the main airport in Bhutan. However, because of Bhutan’s unusual tourist tax, this awesome little country is still off the radar for most international tourists.",
            desc_2: "This travel guide will explain how to do the Tiger’s Nest Bhutan hike, how to get there, what to expect in terms of difficulty, and everything else you need to know before you go!",
        },

        {
            id: "5",
            title: "Tips and Guide",
            date: "POSTED ON MARCH 30, 2023 BY KATIE DIEDERICHS",
            url: "./assets/img/blog-13.jpg",
            url_1: "./assets/img/blog-14.jpg",
            url_2: "./assets/img/blog-15.jpg",
            desc: "To be completely honest, one week in Japan is such a short amount of time to visit this incredibly diverse and interesting country. You could easily spend months exploring the small villages and tiny islands off the coast of the county and still not see it all.",
        },
        {
            id: "6",
            title: "Beginners Guide",
            date: "Beginners Guide | May 6, 2020",
            url: "./assets/img/blog-16.jpg",
            url_1: "./assets/img/blog-17.jpg",
            url_2: "./assets/img/blog-18.jpg",
            desc: "The Channel Islands are comprised of eight islands (Anacapa, San Miguel, Santa Cruz, Santa Rosa, San Nicolas, San Clemente, Santa Barbara, and Santa Catalina) off the coast of Southern California. You’ve probably heard of Catalina Island, but most people have never heard of the other seven islands.",
            desc_1: "Five of these islands are part of the Channel Islands National Park and each of these islands has at least one designated campground.  We were first introduced to this set of islands during a day trip to Anacapa Island from Oxnard, where we spent the afternoon hiking around and got lucky with an unforgettable Orca and Gray whale encounter on our ferry ride back to the mainland.",
            desc_2: "Booking a camping trip to the islands is easy enough, but preparing for the trip requires a little more planning — especially for those who don’t have the right camping gear. Due to the lack of information online, we’ve decided to put together this helpful travel guide for those considering an overnight camping trip to any of the five islands that are part of the Channel Islands National Park.",
        },
        {
            id: "7",
            title: "Most Favourite Places",
            title_1: "Listen to Free Podcasts",
            title_2: "Join a Language Exchange",
            date: "Girl Sees The World | May 6, 2020",
            url: "./assets/img/blog-19.jpg",
            url_1: "./assets/img/blog-20.jpg",
            url_2: "./assets/img/blog-21.jpg",
            desc: "This is a fun way to immerse yourself in a language without having to think too much. You can listen to music in your target language while doing anything from cleaning to cooking to commuting, and you’ll still be learning. Create a playlist of songs on YouTube or find a Spotify playlist you love. Regularly hearing music in your target language will get your brain used to hearing the different sounds of that language.",
            desc_1: "You’d be surprised by how many free books you can find online! There are plenty of novels that you could download as well as grammar textbooks that will help you take your language-learning to the next level. Most free textbooks you’ll find online are a bit old (newer textbooks are EXPENSIVE as any university student can attest to). But language doesn’t change much over the years, so even a language textbook from the 1980s or 1990s will still be pretty relevant today. (You might just come across outdated photos in the book, which adds to the fun if you ask me!) You’ll find several free textbooks through the Foreign Service Institute website in 72 different languages. These free textbooks also come with some free online-learning lessons you can take advantage of.",
            desc_2: "If you don’t find what you’re looking for through the FSI, simply search for lists of some of the best textbooks in your target language. Google search for the book you’re interested in + free pdf. I managed to find free PDF textbooks of a few popular French textbooks that I downloaded to my laptop to practice whenever. I also managed to find free pdf downloads of all seven Harry Potter books in French! ",
        },
        {
            id: "8",
            title: "Asian Culture",
            date: "",
            url: "./assets/img/blog-12.jpg",
            url_1: "./assets/img/blog-5.jpg",
            url_2: "./assets/img/blog-18.jpg",
            desc: "Located near Ram Jhula, Sivananda Ashram is one of the top ashrams in Rishikesh. Founded in 1936, it has attracted people interested in yoga and meditation from around the world. The ashram was started by Swami Sivananda at the age of 37 years. He built Sivananda Ashram for the good of mankind. The ashram was aptly formed as the Divine Life Society.",
            desc_1: "The ashram has separate facilities for male & female yogis and yoga learners. The morning time is set aside for males and the evening time is set aside for the females interested in evening yoga classes. You can attend the Yoga classes on all days other than Sundays. ",
            desc_2: "You can also get free food and accommodation at the ashram. But this facility is only available for seekers who are seriously looking for spiritual meaning in their lives. If you are one of the serious spiritual seekers then you must apply already 30 days in advance. ",
        },
    ];

    localStorage.setItem("todo_List", JSON.stringify(todoList));

    renderDataBlog(todoList[0]);

    clickBlog();
})();
