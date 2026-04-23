"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;

const config_1 = require("config");
const challengeUtils = require("../lib/challengeUtils");
const datacache_1 = require("../data/datacache");
const basket_1 = require("../models/basket");
const security = require("../lib/insecurity");
const user_1 = require("../models/user");
const models = require("../models/index");
const utils = require("../lib/utils");

let loginAttempts = {}; // 🔥 added for brute-force protection

function login() {

    function afterLogin(user, res, next) {
        verifyPostLoginChallenges(user);
        basket_1.BasketModel.findOrCreate({ where: { UserId: user.data.id } })
            .then(([basket]) => {
                const token = security.authorize(user);
                user.bid = basket.id;
                security.authenticatedUsers.put(token, user);
                res.json({
                    authentication: {
                        token,
                        bid: basket.id,
                        umail: user.data.email
                    }
                });
            }).catch((error) => {
                next(error);
            });
    }

    return (req, res, next) => {

        const email = req.body.email || "";

        
        if (!loginAttempts[email]) {
            loginAttempts[email] = 0;
        }

        if (loginAttempts[email] >= 5) {
            return res.status(429).send("Too many login attempts. Try later.");
        }

        verifyPreLoginChallenges(req);

        models.sequelize.query(
            `SELECT * FROM Users WHERE email = '${email}' AND password = '${security.hash(req.body.password || '')}' AND deletedAt IS NULL`,
            { model: user_1.UserModel, plain: true }
        )
            .then((authenticatedUser) => {
                const user = utils.queryResultToJson(authenticatedUser);

                if (user.data?.id && user.data.totpSecret !== '') {
                    res.status(401).json({
                        status: 'totp_token_required',
                        data: {
                            tmpToken: security.authorize({
                                userId: user.data.id,
                                type: 'password_valid_needs_second_factor_token'
                            })
                        }
                    });
                }

                else if (user.data?.id) {
                    loginAttempts[email] = 0;
                    afterLogin(user, res, next);
                }

                else {
                    loginAttempts[email]++;
                    return res.status(401).send("Invalid email or password.");
                }
            })
            .catch((error) => {
                console.error(error);
                return res.status(500).send("Something went wrong");
            });
    };

    function verifyPreLoginChallenges(req) {
        challengeUtils.solveIf(datacache_1.challenges.weakPasswordChallenge,
            () => req.body.email === 'admin@' + config_1.get('application.domain') && req.body.password === 'admin123');
    }

    function verifyPostLoginChallenges(user) {
        challengeUtils.solveIf(datacache_1.challenges.loginAdminChallenge,
            () => user.data.id === datacache_1.users.admin.id);
    }
}

exports.login = login;