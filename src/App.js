import React from 'react';
import './App.css';

function App() {
  return (
    <div id="form">
      <fieldset>
        <form>
          <h1>Form Pembelian Buah</h1>
          <table border="0">
            <tr>
              <td><label for="nama"><strong>Nama Pelanggan</strong></label></td>
              <td><input type="text" id="nama"></input></td>
            </tr>
            <tr>
              <td><label for=""><strong>Daftar Item</strong></label></td>
              <td>
                <input type="checkbox" id="semangka"></input><label for="semangka">Semangka</label><br></br>
                <input type="checkbox" id="jeruk"></input><label for="jeruk">Jeruk</label><br></br>
                <input type="checkbox" id="nanas"></input><label for="nanas">Nanas</label><br></br>
                <input type="checkbox" id="salak"></input><label for="salak">Salak</label><br></br>
                <input type="checkbox" id="anggur"></input><label for="anggur">Anggur</label>
              </td>
            </tr>
            <tr>
              <td><button type="submit">Kirim</button></td>
            </tr>
          </table>
          <br></br>
        </form>
      </fieldset>
    </div>
  );
}

export default App;