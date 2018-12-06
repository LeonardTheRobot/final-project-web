// Priority values for order statuses
const statusSortValues = {
  COLLECTION: 0,
  IN_PROGRESS: 1,
  PENDING: 2,
  COMPLETED: 3,
  FAILED: 4,
};

// Text colour status mapping
const statusColourClassMapping = {
  COLLECTION: 'text-warning',
  IN_PROGRESS: 'text-info',
  PENDING: null,
  COMPLETED: 'text-success',
  FAILED: 'text-danger',
};

/**
 * Array.prototype.sort comparator which compares two orders by their status' priority, defined in
 * statusSortValues
 */
function compareOrdersByStatus(a, b) {
  let sortVal;
  if (statusSortValues[a.status] < statusSortValues[b.status]) {
    sortVal = -1;
  } else if (statusSortValues[a.status] > statusSortValues[b.status]) {
    sortVal = 1;
  } else {
    sortVal = 0;
  }
  return sortVal;
}

function populateOrderTable(orders) {
  const sortedOrders = orders.sort(compareOrdersByStatus);
  sortedOrders.forEach((order) => {
    // Create a link to the view order page for each order
    const idLink = $('<a>', {
      href: `/order/view/${order._id}`,
      text: order._id,
    });

    // Create a bullet point list of the items in this order
    const itemsList = $('<ul>');
    order.items.forEach((item) => {
      itemsList.append($('<li>').text(item));
    });

    // Create cell for order status with colour coding
    const orderStatusCell = $('<td>').text(order.status);
    if (statusColourClassMapping[order.status]) {
      orderStatusCell.addClass(statusColourClassMapping[order.status]);
    }

    // Create a new table row from the data for this order
    const row = $('<tr>').append(
      $('<td>').append(idLink),
      $('<td>').text(order.user),
      $('<td>').text(order.zone),
      $('<td>').append(itemsList),
    ).append(orderStatusCell);

    $('#order-table-body').append(row);
  });
}

$(document).ready(() => {
  $.get('/api/orders', (orderData) => {
    populateOrderTable(orderData);
  });
});
