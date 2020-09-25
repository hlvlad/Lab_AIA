function addToCart(id) {
  fetch('/cart/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
  }).then((res) => {
    let btn = $('#btn-'+id);
    btn.addClass('btn-success').removeClass('btn-warning');
    btn.attr('disabled')
    btn.html('In cart');
    showAlert('success', 'Item added to cart.');
  });
}

function removeFromCart(id) {
  fetch(`/cart/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res) => {
    location.reload();
  });
}

function clearCart() {
  fetch('/cart/', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url;
    }
  });
}

function checkoutCart() {
  fetch('/cart/checkout', {
    method: 'POST',
    credetialls: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url;
    }
  })
}

function resetApp() {
  fetch('/reset', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url;
    }
  });
}

function showAlert(type, message) {
  let header = '';
  switch(type) {
    case 'success':
      header = 'Success!';
      break;
    case 'warning':
      header = 'Warning!';
      break;
    case 'danger':
      header = 'Error!';
      break;
  }
  const alert = `
    <div id="message">
      <div id="message-container" style="padding:5px;">
        <div id="inner-message" class="alert alert-${type} alert-dismissible fade show" role="alert">
          <strong>${header}</strong>
          <span>${message}</span>
        </div>
      </div>
    </div>
  `;
  if($('#message').length) {
    $('#message').replaceWith(alert);
  } else {
    $("body").append(alert);
  }
  $("#inner-message").fadeTo(3000, 500).slideUp(500, function() {
    $(this).slideUp(500);
    $(this).alert('close');
    $('#message').remove();
  })
}

$(document).ready(function() {
  if($('#message').length) {
    $("#inner-message").fadeTo(3000, 500).slideUp(500, function() {
      $(this).slideUp(500);
      $(this).alert('close');
      $('#message').remove();
    });
  }
});