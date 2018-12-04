import Map from './map.js';

function updateOrderTable(orderData) {
  $('#user-cell').text(orderData.user);
  $('#zone-cell').text(orderData.zone);
  $('#items-cell > ul').empty();
  orderData.items.forEach((item) => {
    $('#items-cell > ul').append($('<li>').text(item));
  });
  $('#status-cell').text(orderData.status);
  $('#loading-text').addClass('d-none');
  $('#order-table').removeClass('d-none');
}

function update(map, orderId) {
  $.get('/api/robot', (robotData) => {
    requestAnimationFrame(() => {
      map.update(robotData.location);
    });
  });
  $.get(`/api/orders/${orderId}`, (orderData) => {
    updateOrderTable(orderData);
  });
}

$(document).ready(() => {
  const map = new Map($('#map-canvas'));
  const orderId = $('#id-cell').text();
  update(map, orderId);
  setInterval(() => {
    if ($('#auto-update-checkbox').is(':checked')) {
      update(map, orderId);
    } else {
      console.log('Auto-update not checked');
    }
  }, 5000);
});
