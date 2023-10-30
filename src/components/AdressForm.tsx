import { AddressElement } from '@stripe/react-stripe-js';
import React from 'react';

function AddressForm() {
  return (
    <form>
      <h3>Address</h3>
      <AddressElement
        options={{ mode: 'shipping' }}
        onChange={(event) => {
          const address = event.value.address;
        }}
      />
    </form>
  );
}

export default AddressForm;
