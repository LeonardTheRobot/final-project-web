function populateUsers(users) {
  users.forEach((user) => {
    $('#user-select').append($('<option>', {
      value: user.name,
      text: user.name,
    }));
  });
}

function populateZones(zones) {
  zones.forEach((zone) => {
    $('#zone-select').append($('<option>', {
      value: zone,
      text: zone,
    }));
  });
}

function populateItems(items) {
  const itemsCardBody = $('#items-card > .card-body');
  items.forEach((item) => {
    const itemRow = $('<div>', {
      class: 'form-group row',
    });
    itemRow.append($('<label>', {
      class: 'col-form-label col-lg-2',
      text: item.name,
    }));
    const itemFieldDiv = $('<div>', {
      class: 'col-lg-2',
    });
    itemFieldDiv.append($('<input>', {
      class: 'form-control',
      id: `${item.name.toLowerCase()}-field`,
      name: item.name,
      type: 'number',
      min: 0,
      max: 5,
      value: 0,
    }));
    itemRow.append(itemFieldDiv);
    itemsCardBody.append(itemRow);
  });
}

function bindFormSubmit(items) {
  $('#order-form').submit((e) => {
    e.preventDefault();

    const itemList = [];
    items.forEach((item) => {
      const itemQuantity = $(`#${item.name.toLowerCase()}-field`).val();
      for (let i = 0; i < itemQuantity; i += 1) {
        itemList.push(item.name);
      }
    });

    const orderData = {
      user: $('#user-select').val(),
      zone: $('#zone-select').val(),
      items: itemList,
    };

    $.post({
      url: '/api/orders',
      data: JSON.stringify(orderData),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: (res) => {
        // If order is placed successfully, redirect user to view it
        window.location.replace(`/order/view/${res._id}`);
      },
    });
  });
}

// Get all users from the API and populate the user select
$.get('/api/users', (users) => {
  populateUsers(users);
});

// Populate the zone select
const zones = ['A', 'B', 'C', 'D'];
populateZones(zones);

// Get all items from the API and populate the list of items
$.get('/api/items', (items) => {
  populateItems(items);
  bindFormSubmit(items);
});
