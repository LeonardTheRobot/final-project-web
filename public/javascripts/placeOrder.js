function populateUsers() {
  $.get('/api/users', (users) => {
    users.forEach((user) => {
      $('#user-select').append($('<option>', {
        value: user._id,
        text: user.name,
      }));
    });
  });
}

function populateZones() {
  const zones = ['A', 'B', 'C', 'D'];
  zones.forEach((zone) => {
    $('#zone-select').append($('<option>', {
      value: zone,
      text: zone,
    }));
  });
}

function populateItems() {
  $.get('/api/items', (items) => {
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
        name: item.name,
        type: 'number',
        min: 0,
        max: 5,
        value: 0,
      }));
      itemRow.append(itemFieldDiv);
      itemsCardBody.append(itemRow);
    });
  });
}

function bindFormSubmit() {
  $('#order-form').submit((e) => {
    e.preventDefault();
    console.log(JSON.stringify($('#order-form').serializeArray()));
  });
}

populateUsers();
populateZones();
populateItems();
bindFormSubmit();
