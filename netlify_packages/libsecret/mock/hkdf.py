
# Upstream Author: Zooko O'Whielacronx <zooko@zooko.com>
#
#	Copyright:
#
#	You may use this package under the GNU General Public License, version
#	2 or, at your option, any later version.  You may use this package
#	under the Transitive Grace Period Public Licence, version 1.0 or, at
#	your option, any later version.  (You may choose to use this package
#	under the terms of either licence, at your option.)  See the file
#	COPYING.TESTS for the terms of the GNU General Public License, version 2.
#
#	The following licensing text applies to a subset of the Crypto++ source code
#	which is included in the pycryptopp source tree under the "embeddedcryptopp"
#	subdirectory.  That embedded subset of the Crypto++ source code is not used
#	when pycryptopp is built for Debian -- instead the --disable-embedded-cryptopp
#	option to "setup.py build" is used to for pycryptopp to build against the
#	system libcryptopp.

import hashlib, hmac

class HKDF(object):
    def __init__(self, ikm, L, salt=None, info=None, digestmod = None):
        self.ikm = ikm
        self.keylen = L

        if digestmod is None:
            digestmod = hashlib.sha256

        if callable(digestmod):
            self.digest_cons = digestmod
        else:
            self.digest_cons = lambda d='':digestmod.new(d)
        self.hashlen = len(self.digest_cons().digest())

        if salt is None:
            self.salt = b'\x00' * (self.hashlen)
        else:
            self.salt = salt

        self.info = info or b''

    #extract PRK
    def extract(self):
        h = hmac.new(self.salt, self.ikm, self.digest_cons)
        self.prk = h.digest()
        return self.prk

    #expand PRK
    def expand(self):
        T = b""
        temp = b""
        i=0x01
        while len(T)<self.keylen :
            msg = temp
            msg += self.info
            msg += bytes((i,))
            h = hmac.new(self.prk, msg, self.digest_cons)
            temp = h.digest()
            i += 1
            T += temp

        self.okm = T[0:self.keylen]
        return self.okm

def new(ikm, L, salt=None, info="", digestmod = None):
    return HKDF(ikm, L,salt,info,digestmod)

def hkdf(ikm, length, salt=None, info=""):
	hk = HKDF(ikm, length ,salt,info)
	hk.extract()
	return hk.expand()