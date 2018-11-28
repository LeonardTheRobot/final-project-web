$('#order-form').submit((e) => {
  e.preventDefault();
});

$.get('/api/users', (users) => {
  users.forEach((user) => {
    $('#user-select').append($('<option>', {
      value: user._id,
      text: user.name,
    }));
  });
});

const zones = ['A', 'B', 'C', 'D'];
zones.forEach((zone) => {
  $('#zone-select').append($('<option>', {
    value: zone,
    text: zone,
  }));
});
