//log last updated 1.18.20

export const modularity = () => {
  const modal = document.querySelector('#modal-menu');
  const backdrop = document.querySelector('#modal-backdrop');
  const modalButton = document.querySelector('#modal-button');

  modalButton.addEventListener('click', () => {
    showModal(modal, backdrop);
  });

  backdrop.addEventListener('click', () => {
    backdrop.style.display = 'none';
    modal.style.display = 'none';
  });

  const showModal = (modal, backdrop) => {
    const modalText = document.querySelector('.modal-text');
    const pastPlayers = [];
    const playerHistory = JSON.parse(localStorage.getItem('pastResults'));

    playerHistory.forEach(p => {
      pastPlayers.push(`
        <div class="modal-cell" id="modal-cell${p.id}">${getKeys(p)}</div>
      `);
    });

    modalText.innerHTML = pastPlayers.join('');

    backdrop.style.display = 'block';
    modal.style.display = 'block';

    return playerHistory;
  }

  const getKeys = (pl) => {
    const pairs = [];

    Object.keys(pl).forEach(key => {
      const value = pl[key];

      key == 'id' ? value++ : value;
      pairs.push(`${key}: ${value}`);
    });

    const joined = pairs.join('<br>');

    return joined;
  }
}