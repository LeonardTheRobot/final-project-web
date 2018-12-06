import Map from './map.js';

function updateOrderQueue(robotOrderQueue) {
  // Clear the table
  $('#order-queue-table-body').empty();
  // Iterate over each order in the queue
  robotOrderQueue.forEach((orderId, i) => {
    $.get(`/api/orders/${orderId}`, (orderData) => {
      // Create a link to the view order page for each order in the queue
      const orderIdLink = $('<a>', {
        href: `/order/view/${orderId}`,
        text: orderId,
      });

      // Create a bullet point list of the items in this order
      const itemsList = $('<ul>');
      orderData.items.forEach((item) => {
        itemsList.append($('<li>').text(item));
      });

      // Create a new table row from the data for this order
      const row = $('<tr>').append(
        $('<td>').text(i + 1),
        $('<td>').append(orderIdLink),
        $('<td>').text(orderData.user),
        $('<td>').text(orderData.zone),
        $('<td>').append(itemsList),
        $('<td>').text(orderData.status),
      );

      // Append the row in the correct order based on the orderQueue rather than the order in which
      // the order API calls returned
      // If this is the first in the queue or if this is the first API return, place the row first
      // Otherwise, place the row in its correct position based on the index of the forEach loop
      if (i === 0 || $('#order-queue-table-body > tr').length === 0) {
        $('#order-queue-table-body').prepend(row);
      } else {
        $(`#order-queue-table-body > tr:nth-child(${i})`).after(row);
      }
    });
  });
}

function update(map) {
  $.get('/api/robot', (robotData) => {
    requestAnimationFrame(() => {
      map.update(robotData.location);
      updateOrderQueue(robotData.orderQueue);
    });
  });
}

$(document).ready(() => {
  const map = new Map($('#map-canvas'));
  update(map);
  setInterval(() => {
    if ($('#auto-update-checkbox').is(':checked')) {
      update(map);
    } else {
      console.log('Auto-update not checked');
    }
  }, 5000);
});
