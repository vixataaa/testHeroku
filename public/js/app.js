function getAllHotels() {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: '/hotels',
            success: (data) => resolve(data)
        });
    });

    return promise;
}

function addNewHotel(name) {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/hotels',
            contentType: 'application/json',
            data: JSON.stringify({name: name}),
            success: () => resolve('Done')
        });
    });

    return promise;
}

function findHotelByName(name) {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'PUT',
            url: '/hotels',
            contentType: 'application/json',
            data: JSON.stringify({name: name}),
            success: (data) => resolve(data)
        });
    });

    return promise;
}

function editHotelData(hotelName, values) {
    values['name'] = hotelName;
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'PATCH',
            url: '/hotels',
            contentType: 'application/json',
            data: JSON.stringify(values),
            success: (data) => resolve(data)
        });
    });

    return promise;
}

function displayData(data) {
    console.log(data);
    let names = "Names:<br>";

    if(!Array.isArray(data)) {
        $("#container").html(data.name);
        return;
    }

    for (let i = 0; i < data.length; i++) {
        names += data[i].name + '<br>';
    }

    $("#container").html(names);
}

editHotelData('Hotel a', {price: 42, someAsd: 69});

$('#display-btn')
    .on('click', function (ev) {
        getAllHotels().then(displayData);
    });

$('#add-btn').on('click', function (ev) {
    let name = $('#name-field').val();

    addNewHotel(name);
    $("#name-field").val('');
});

$('#search-btn').on('click', function(ev) {
    let searchParam = $('#search-field').val();

    findHotelByName(searchParam).then(displayData);
});