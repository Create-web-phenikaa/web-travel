export function lightBox({ modalId, imgElement, lightBoxPrev, lightBoxNext }) {
  const modalElement = document.getElementById(modalId)
  let current = 0

  if (!modalElement) return

  const imgElement = modalElement.getElementById(imgElement)
  const prevElement = modalElement.getElementById(lightBoxPrev)
  const nextElement = modalElement.getElementById(lightBoxNext)
  const imgList = document.querySelectorAll('img[data-album="tour"]')

  if (!imgElement || !prevElement || !nextElement) return

  function assignSrc(element) {
    imgElement.src = element.src
  }

  document.addEventListener('click', (e) => {
    const { target } = e

    if (target.tagName !== 'IMG' || !target.dataset.album) return

    console.log(e.target)
  })

  function showModal() {
    const myModal = new bootstrap.Modal(modalElement)
    if (myModal) myModal.show()
  }

  prevElement.addEventListener('click', () => {})

  nextElement.addEventListener('click', () => {})
}
