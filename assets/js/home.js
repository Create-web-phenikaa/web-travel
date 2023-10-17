function lightBox() {
    const modalElement = document.getElementById("lightbox");
    let current = 0;

    if (!modalElement) return;

    const imgElement = document.getElementById("lightBoxImg");
    const prevElement = document.getElementById("lightBoxPrev");
    const nextElement = document.getElementById("lightBoxNext");
    const imgList = document.querySelectorAll('img[data-album="tour"]');

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

(() => {
    lightBox();
})();
