function lightBox() {
  const modalElement = document.getElementById('lightbox')
  let current = 0

  if (!modalElement) return

  const imgElement = document.getElementById('lightBoxImg')
  const prevElement = document.getElementById('lightBoxPrev')
  const nextElement = document.getElementById('lightBoxNext')
  const imgList = document.querySelectorAll('img[data-album="tour"]')

  console.log(imgList)

  if (!imgElement || !prevElement || !nextElement) return

  function assignSrc(element) {
    imgElement.src = element.src
  }

  function showModal() {
    const myModal = new bootstrap.Modal(modalElement)
    if (myModal) myModal.show()
  }

  document.addEventListener('click', (e) => {
    const { target } = e

    if (target.tagName !== 'IMG' || !target.dataset.album) return

    current = [...imgList].findIndex((x) => x === target)
    console.log(current)

    assignSrc(target)
    showModal()
  })

  prevElement.addEventListener('click', () => {})

  nextElement.addEventListener('click', () => {})
}

;(() => {
  lightBox()
})()
