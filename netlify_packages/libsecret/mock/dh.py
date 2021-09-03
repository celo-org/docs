
# WARNING: This is for use in mock objects during testing, and NOT
# cryptographically secure or performant.

#
# Copyright 2011 Stef Walter
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation; either version 2 of the licence or (at
# your option) any later version.
#
# See the included COPYING file for more information.
#

#
# Some utility functions from tlslite which is public domain
# Written by Trevor Perrin <trevp at trevp.net>
# http://trevp.net/tlslite/
#

import math
import random

PRIME = b'\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xC9\x0F\xDA\xA2\x21\x68\xC2\x34\xC4\xC6\x62\x8B\x80\xDC\x1C\xD1' \
	b'\x29\x02\x4E\x08\x8A\x67\xCC\x74\x02\x0B\xBE\xA6\x3B\x13\x9B\x22\x51\x4A\x08\x79\x8E\x34\x04\xDD' \
	b'\xEF\x95\x19\xB3\xCD\x3A\x43\x1B\x30\x2B\x0A\x6D\xF2\x5F\x14\x37\x4F\xE1\x35\x6D\x6D\x51\xC2\x45' \
	b'\xE4\x85\xB5\x76\x62\x5E\x7E\xC6\xF4\x4C\x42\xE9\xA6\x37\xED\x6B\x0B\xFF\x5C\xB6\xF4\x06\xB7\xED' \
	b'\xEE\x38\x6B\xFB\x5A\x89\x9F\xA5\xAE\x9F\x24\x11\x7C\x4B\x1F\xE6\x49\x28\x66\x51\xEC\xE6\x53\x81' \
	b'\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF'

def num_bytes(number):
	return math.ceil(number.bit_length() / 8)

def number_to_bytes(number):
	n_data = num_bytes(number)
	return number.to_bytes(n_data, 'big')

def generate_pair():
	prime = int.from_bytes(PRIME, 'big')
	base = 2
	# print "mock prime: ", hex(prime)
	# print " mock base: ", hex(base)
	bits = prime.bit_length()
	privat = 0
	while privat == 0:
		privat = random.getrandbits(bits - 1)
	publi = pow(base, privat, prime)
	return (privat, publi)

def derive_key(privat, peer):
	prime = int.from_bytes(PRIME, 'big')
	key = pow(peer, privat, prime)
	# print " mock ikm2: ", hex(key)
	return number_to_bytes(key)
