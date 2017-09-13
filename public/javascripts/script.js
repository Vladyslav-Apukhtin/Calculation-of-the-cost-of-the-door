$(document).ready(function() {
    const inputHeight       =  $('#height');
    const resultHeightY     =  $('#heightY');
    const inputWidth        =  $('#width');
    const resultWidthX      =  $('#widthX');
    const inputAmountDors   =  $('#amountInputDors');
    const resultAmountDors  =  $('#resultAmountDors');
    const resultOneSizeDor  =  $('#resultOneSizeDor');
    const resultTypeSystem  =  $('#resultTypeSystem');
    const resultColorSystem =  $('#resultColorSystem');
    const resultProfile     =  $('#resultProfile');
    const amountDors        =  6;
    const minDors           =  1;
    const minHeight         =  100;
    const maxHeight         =  2900;
    const minWidth          =  500;
    const maxWidth          =  5500;
    const resultList        =  $('#resultList');

    // galery photo
    $('.filter').hide();
    $('.filter-button').click(function() {
        let value = $(this).attr('data-filter');

        $('.filter').not('.' + value).hide('3000');
        $('.filter').filter('.' + value).show('3000');
        if ($('.filter-button').removeClass('active')) {
            $(this).removeClass('active');
        }
        $(this).addClass('active');
    });

    resultOneSizeDor.text(
        `${resultHeightY.text()} x ${parseInt(resultWidthX.text() / Number(resultAmountDors.text()), 10)}`
    );

    $('#afterOrder').hide();

    inputHeight.on('change', event => {
        if (event.target.value > maxHeight) {
            inputHeight[0].value = maxHeight;
        }
        if (event.target.value < minHeight) {
            inputHeight[0].value = minHeight;
        }
        resultHeightY.text(`${event.target.value}`);
        resultOneSizeDor.text(
            `${event.target.value} x ${parseInt(resultWidthX.text() / Number(resultAmountDors.text()), 10)}`
        );
    });
    inputWidth.on('change', event => {
        if (event.target.value > maxWidth) {
            inputWidth[0].value = maxWidth;
        }
        if (event.target.value < minWidth) {
            inputWidth[0].value = minWidth;
        }
        resultWidthX.text(`${event.target.value}`);
        resultOneSizeDor.text(
            `${resultHeightY.text()} x ${parseInt(event.target.value / Number(resultAmountDors.text()), 10)}`
        );
    });
    inputAmountDors.on('change', event => {
        if(event.target.value > amountDors) {
            inputAmountDors[0].value = amountDors;
        }
        if(event.target.value < minDors) {
            inputAmountDors[0].value = minDors;
        }
        resultAmountDors.text(`${event.target.value}`);
        for(let i = 0; i <= amountDors; i++) {
            $(`.Dor${i}`).show();
        }
        for(let i = amountDors; i > event.target.value; i--) {
            $(`.Dor${i}`).hide();
        }
        resultOneSizeDor.text(
            `${resultHeightY.text()} x ${parseInt(resultWidthX.text() / Number(resultAmountDors.text()), 10)}`
        );

        $('#allDoors').empty();
        console.log(createPictureWithDoors(event.target.value));
        $('#allDoors').append(createPictureWithDoors(event.target.value));
    });

const createPictureWithDoors = amountDoors => {
    let createHtmlDoors = '';
    let createHtmlLine = '';
    let createNameDoors = '';
    const widthPictureBootstrap = Math.floor(12 / amountDoors);
    const widthPicture = 100 / amountDoors;

    for (let i = 0; i < amountDoors; i++) {
        createHtmlDoors += `
            <div class="col-sm-${widthPictureBootstrap}" style="width: ${widthPicture}%">
                <div class="boxTopBottom"></div>
                <div class="boxMiddle"></div>
                <div class="boxTopBottom"></div>
            </div>
        `;
        createHtmlLine += `
            <div class="col-sm-${widthPictureBootstrap}" style="width: ${widthPicture}%">
                <hr/>
            </div>
        `;
        createNameDoors +=`
            <div class="col-sm-${widthPictureBootstrap}" style="width: ${widthPicture}%">
                <div class="nameDoor">Дверка</div>
                <div class="row"></div>
            </div>
            
        `
    }

    return `
        <div class="row nameDoors">
            ${createNameDoors}
        </div>
        <div class="row Doors">
            <div class="door">
                ${createHtmlDoors}
            </div>
        </div>
        <div class="row">
            ${createHtmlLine}
        </div>
    `;
}

$('#allDoors').append(createPictureWithDoors(amountDors));

    $('#inputTypeSystem1').on('change', event => {
        resultTypeSystem.text(`Стандарт (сталь)`);
    });
    $('#inputTypeSystem2').on('change', event => {
        resultTypeSystem.text(`Економ (алюміній)`);
    });
    $('#inputColorSystem1').on('change', event => {
        resultColorSystem.text(`Шампань`);
    });
    $('#inputColorSystem2').on('change', event => {
        resultColorSystem.text(`Золото`);
    });
    $('#inputColorSystem3').on('change', event => {
        resultColorSystem.text(`Срібло`);
    });
    $('#inputColorSystem4').on('change', event => {
        resultColorSystem.text(`Венге`);
    });
    $('#typeProfile1').on('change', event => {
        resultProfile.text(`Стандарт`);
    });
    $('#typeProfile2').on('change', event => {
        resultProfile.text(`Широка`);
    });
    $('#typeProfile3').on('change', event => {
        resultProfile.text(`Квадро`);
    });
    $('#typeProfile4').on('change', event => {
        resultProfile.text(`Стандарт (паз)`);
    });
    $('#selectDor1').on('change', event => {
        $('#selectImgDor1').attr('src',
            `/images/Фотки на дверки/${$("#selectDor1 :selected").text()} 2.png`);
        $('#resultDor1').text(`${$("#selectDor1 :selected").text()}`);
    });
    $('#selectDor2').on('change', event => {
        $('#selectImgDor2').attr('src',
            `/images/Фотки на дверки/${$("#selectDor2 :selected").text()} 2.png`);
        $('#resultDor2').text(`${$("#selectDor2 :selected").text()}`);
    });
    $('#selectDor3').on('change', event => {
        $('#selectImgDor3').attr('src',
            `/images/Фотки на дверки/${$("#selectDor3 :selected").text()} 2.png`);
        $('#resultDor3').text(`${$("#selectDor3 :selected").text()}`);
    });
    $('#selectDor4').on('change', event => {
        $('#selectImgDor4').attr('src',
            `/images/Фотки на дверки/${$("#selectDor4 :selected").text()} 2.png`);
        $('#resultDor4').text(`${$("#selectDor4 :selected").text()}`);
    });
    $('#selectDor5').on('change', event => {
        $('#selectImgDor5').attr('src',
            `/images/Фотки на дверки/${$("#selectDor5 :selected").text()} 2.png`);
        $('#resultDor5').text(`${$("#selectDor5 :selected").text()}`);
    });
    $('#selectDor6').on('change', event => {
        $('#selectImgDor6').attr('src',
            `/images/Фотки на дверки/${$("#selectDor6 :selected").text()} 2.png`);
        $('#resultDor6').text(`${$("#selectDor6 :selected").text()}`);
    });
    resultList.bind("DOMSubtreeModified", function() {
        $('#orderInBD').show('7000');
        $('#beforeOrder').show('7000');
        $('#afterOrder').slideUp();
        const allDoors = [];

        for(let i = 1; i <= Number(resultAmountDors.text()); i++) {
            let door = {
                name: `Door${i}`,
                height: Number(resultHeightY.text()),
                width: parseInt(Number(resultWidthX.text()) / Number(resultAmountDors.text())),
                typeSystem: resultTypeSystem.text(),
                color: resultColorSystem.text(),
                typeProfile: resultProfile.text(),
                filling: $(`#resultDor${i}`).text(),
                S: parseInt(
                    Number(resultWidthX.text()) / Number(resultAmountDors.text())) 
                        * Number(resultHeightY.text()),
                P: 2 * (
                    parseInt(
                        Number(resultWidthX.text()) / Number(resultAmountDors.text())) 
                            + Number(resultHeightY.text()
                    ))
            }; 

            allDoors.push(door);
        }
        const calculationPrice = (door) => {
            const typeSystem = {"Стандарт (сталь)": 10, "Економ (алюміній)": 20};
            const color = {"Шампань": 25, "Золото": 20, "Срібло": 15, "Венге": 10};
            const typeProfile = {"Стандарт": 10, "Широка": 25, "Квадро": 20, "Стандарт (паз)": 15};
            const filling = {"Матування": 10, "Дзеркало": 20, "Фотодрук": 25, "Лакобель": 15};

            let priceSytem = typeSystem[door.typeSystem];
            let priceColor = color[door.color];
            let priceProfile = typeProfile[door.typeProfile];
            let priceFilling = filling[door.filling];
            let priceProfileOneDoor = (priceSytem + priceColor + priceProfile) * door.P;
            let priceFillingOneDoor = priceFilling * door.S;

            return priceProfileOneDoor + priceFillingOneDoor;
        }

        const isNotEmpty = (mass) => {
            return JSON.stringify(mass) !== '{}'  
        } 
        
        if(allDoors.length !== 0 && allDoors.every(isNotEmpty)) {
            let result = allDoors.reduce(function(sum, current) {
                return sum + calculationPrice(current);
            }, 0);
            $('#lastAmount').text(Math.floor(result / 1000)); // убрал 3 знака, поиграешся с ценами
        }
    });
    
    $('#orderInBD').click(function (e) {
        e.preventDefault();
        $('#afterOrder').slideDown('5000');
        $('#orderInBD').slideUp();
        $('#beforeOrder').slideUp();
        const allDoors = {
            height: Number(resultHeightY.text()),
            width: parseInt(Number(resultWidthX.text()), 10),
            amount: parseInt(resultAmountDors.text(), 10),
            size: `${Number(resultHeightY.text())} x ${
                parseInt(Number(resultWidthX.text()) / Number(resultAmountDors.text()), 10)}`,
            type: resultTypeSystem.text(),
            color: resultColorSystem.text(),
            form: resultProfile.text(),
            login: $('#userLogin').text().substring(8)
        }
        for(let i = 1; i <= Number(resultAmountDors.text()); i++) {
            allDoors[`dor${i}`] = $(`#resultDor${i}`).text();
        }
        $.ajax('http://localhost:3000/order', {
            type: 'POST',
            data: JSON.stringify(allDoors),
            contentType: 'application/json',
            success: () => {console.log('success')},
            error: () => {console.log('error')}
        });
    });
});
