describe('Проверка покупки нового аватара', function () {                 
    it('Сквозной e2e тест на покупку нового аватара для тренера', function () { 
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   // находим поле "Почта" и вводим логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               // находим поле "Пароль" и вводим пароль
         cy.get('button[type="submit"]').click();                // находим и нажимаем кнопку "Войти"
         cy.wait(2000);                                      // ждем 2 секунды
         cy.get('.header_card_trainer').click();            // находим в шапке аватарку тренера и кликаем на нее
         cy.wait(2000);                                     // ждем 2 секунды
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // находим и нажимаем кнопку "Смена аватара"
         cy.get('.available > button').first().click();   // кликаем "Купить" у первого доступного аватара
         cy.get('.card_number').type('4620869113632996');                     // находим поле "Номер" и вводим номер карты
         cy.get('.card_csv').type('125');                             // находим поле "Код" и вводим CVV карты
         cy.get('.card_date').type('12/26');                           // находим поле "Срок" и вводим срок действия карты
         cy.get('.card_name').type('NAME');                           // находим поле "Имя" и вводим имя владельца действия карты
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // находим и нажимаем кнопку "Оплатить"
         cy.get('.threeds_number').type('56456');                            // находим поле "Код из пуша или СМС" и вводим код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // находим и нажимаем кнопку "Оплатить"
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
     });
 });