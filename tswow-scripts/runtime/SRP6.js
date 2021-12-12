// Borrowed by TSWoW from https://github.com/Miorey/trinitycore-srp6
const BigInteger = require(`big-integer`)
const { bufToBigint } = require("bigint-conversion")
const crypto = require(`crypto`)

function assert_ (val, msg) {
    if (!val) { throw new Error(msg || `assertion`) }
}

const params = {
    trinitycore: {
        N_length_bits: 256,
        N: BigInt(`0x894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7`),
        g: BigInt(`0x7`),
        hash: `sha1`
    }
}

function assertIsBuffer (arg, argname) {
    argname = argname || `arg`
    assert_(Buffer.isBuffer(arg), `Type error: ` + argname + ` must be a buffer`)
}

/*
 */
/**
 *
 * @param {{}} params
 * @param {Buffer} salt
 * @param {string} identity
 * @param {string} password
 * @return {BigInteger}
 * compute the intermediate value x as a hash of three buffers:
 * salt, identity, and password.  And a colon.  FOUR buffers.
 *
 *      x = LE(H(s | H(I | ":" | P)))
 *
 * params:
 *         salt     (buffer)    salt
 *         identity (string)    user identity
 *         password (string)    user password
 *         LE                   little endian
 *
 * returns: x (bignum)      user secret
 */
function getX (params, salt, identity, password) {
    assertIsBuffer(salt, `salt (salt)`)
    const hashIP = crypto.createHash(params.hash)
        .update(identity + `:` + password)
        .digest()
    const hashX = crypto.createHash(params.hash)
        .update(salt)
        .update(hashIP)
        .digest()
    return BigInteger(bufToBigint(hashX.reverse()));
}

/**
 *
 * @param {{}} params (obj) group parameters, with .N, .g, .hash
 * @param {Buffer} salt
 * @param {string} identity
 * @param {string} password
 * @return {Buffer}
 * The verifier is calculated as described in Section 3 of [SRP-RFC].
 * We give the algorithm here for convenience.
 *
 * The verifier (v) is little endian computed based on the salt (s), user name (I),
 * password (P), and group parameters (N, g).
 *
 *         x = LE(H(s | H(user | ":" | pass)))
 *         v = LE(g^x % N)
 *
 * params:
 *         params (obj)     group parameters, with .N, .g, .hash
 *         salt (buffer)        salt
 *         identity (string)    user identity
 *         identity (string)    user password
 *         LE                   little endian
 *
 */
function computeVerifier (params, salt, identity, password) {
    const x = getX(params, salt, identity, password)
    const g = params.g
    const N = params.N
    const verifier = BigInteger(g).modPow(x, N)
    const lEVerifier = verifier.value.toString(16).match(/.{2}/g).reverse().join(``)
    return Buffer.from(lEVerifier, `hex`)
}

module.exports = {
    computeVerifier,
    params
}
