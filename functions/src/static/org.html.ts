export default `
<h2>Přihlásil se nový hráč!</h2>

<p>ID: {{id}}</p>

<h4>Hráč:</h4>

<table>
    <tr>
        <td>Jméno</td>
        <td>{{name}}</td>
    </tr>
    <tr>
        <td>Přezdívka</td>
        <td>{{nick}}</td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td><a href="mailto:{{email}}">{{email}}</a></td>
    </tr>
    <tr>
        <td>Telefon</td>
        <td><a href="tel:{{phone}}">{{phone}}</a></td>
    </tr>
    <tr>
        <td>Datum narození</td>
        <td>{{dob}}</td>
    </tr>
    <tr>
        <td>Alergie</td>
        <td>{{allergies}}</td>
    </tr>
    <tr>
        <td>Adresa</td>
        <td>{{address}}</td>
    </tr>
    <tr>
        <td>Pojišťovna</td>
        <td>{{insurance}}</td>
    </tr>
</table>

<h4>Rodič:</h4>

<table>
    <tr>
        <td>Jméno</td>
        <td>{{parent_name}}</td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td><a href="mailto:{{parent_email}}">{{parent_email}}</a></td>
    </tr>
    <tr>
        <td>Telefon</td>
        <td><a href="tel:{{parent_phone}}">{{parent_phone}}</a></td>
    </tr>
    <tr>
        <td>Adresa</td>
        <td>{{parent_address}}</td>
    </tr>
</table>
`
