import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json" // импортируем выделенные в отдельные файлы локаторы (по заветам Page Object Model)
import * as data from "../helpers/default_data.json" // импортируем из отдельного файла логин и пароль

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/'); // зашли на сайт login.qa.studio (Url в config)
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка, что надпись "Забыли пароль" нужного цвета
           });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // проверка, что крестик есть и он виден
        });

   it('1. Позитивный кейс авторизации', function () {
        cy.get(main_page.email).type(data.login); // нашли поле "E-mail" и ввели верный логин 
        cy.get(main_page.password).type(data.password); // нашли поле "Пароль" и ввели верный пароль
        cy.get(main_page.login_button).click(); // нашли кнопку "Войти" и нажали на нее
        cy.get(result_page.title).should('be.visible'); // проверка, что появился текст и он виден
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка, что получили нужный текст
    })

    it('2. Логика восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нажали кнопку "Забыли пароль?"
        cy.get(recovery_password_page.email).type(data.login); // на странице "Восстановите пароль" нашли поле "E-mail" и ввели туда логин
        cy.get(recovery_password_page.send_button).click(); // нажали кнопку "Отправить код"
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверка, что получили нужный текст
    })

    it('3. Верный логин и НЕверный пароль', function () {
        cy.get(main_page.email).type(data.login); // нашли поле "E-mail" и ввели верный логин 
        cy.get(main_page.password).type('iLoveqastudio5'); // нашли поле "Пароль" и ввели НЕверный пароль
        cy.get(main_page.login_button).click();  // нашли кнопку "Войти" и нажали на нее
        cy.get(result_page.title).should('be.visible'); // проверка, что появился текст и он виден
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка, что получили нужный текст
    })

    it('4. НЕверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german11@dolnikov.ru'); // нашли поле "E-mail" и ввели НЕверный логин 
        cy.get(main_page.password).type(data.password); // нашли поле "Пароль" и ввели верный пароль
        cy.get(main_page.login_button).click();  // нашли кнопку "Войти" и нажали на нее
        cy.get(result_page.title).should('be.visible'); // проверка, что появился текст и он виден
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверка, что получили нужный текст
    })

    it('5. Негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // нашли поле "E-mail" и ввели логин без @
        cy.get(main_page.password).type(data.password); // нашли поле "Пароль" и ввели верный пароль
        cy.get(main_page.login_button).click(); // нашли кнопку "Войти" и нажали на нее
        cy.get(result_page.title).should('be.visible'); // проверка, что появился текст и он виден
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверка, что получили нужный текст
    })

    it('6. Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // нашли поле "E-mail" и ввели логин с прописными буквами
        cy.get(main_page.password).type(data.password); // нашли поле "Пароль" и ввели верный пароль
        cy.get(main_page.login_button).click(); // нашли кнопку "Войти" и нажали на нее
        cy.get(result_page.title).should('be.visible'); // проверка, что появился текст и он виден
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверка, что получили нужный текст
    })
})