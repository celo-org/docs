
lib_LTLIBRARIES += libsecret-@SECRET_MAJOR@.la


incdir = $(includedir)/libsecret-@SECRET_MAJOR@/libsecret

libsecret_HEADS = \
	libsecret/secret.h \
	libsecret/secret-attributes.h \
	libsecret/secret-collection.h \
	libsecret/secret-item.h \
	libsecret/secret-password.h \
	libsecret/secret-paths.h \
	libsecret/secret-prompt.h \
	libsecret/secret-schema.h \
	libsecret/secret-schemas.h \
	libsecret/secret-service.h \
	libsecret/secret-types.h \
	libsecret/secret-value.h \
	$(NULL)

inc_HEADERS = \
	$(libsecret_HEADS) \
	libsecret/secret-enum-types.h \
	$(NULL)

libsecret_BUILT = \
	secret-dbus-generated.c secret-dbus-generated.h \
	libsecret/secret-enum-types.c libsecret/secret-enum-types.h \
	$(NULL)

libsecret_PUBLIC = \
	libsecret/secret-attributes.h libsecret/secret-attributes.c \
	libsecret/secret-collection.h libsecret/secret-collection.c \
	libsecret/secret-item.h libsecret/secret-item.c \
	libsecret/secret-methods.c \
	libsecret/secret-password.h libsecret/secret-password.c \
	libsecret/secret-prompt.h libsecret/secret-prompt.c \
	libsecret/secret-schema.h libsecret/secret-schema.c \
	libsecret/secret-schemas.h libsecret/secret-schemas.c \
	libsecret/secret-service.h libsecret/secret-service.c \
	libsecret/secret-types.h \
	libsecret/secret-value.h libsecret/secret-value.c \
	libsecret/secret-paths.h libsecret/secret-paths.c \
	$(NULL)

libsecret_PRIVATE = \
	libsecret/secret-private.h \
	libsecret/secret-session.c \
	libsecret/secret-util.c \
	$(NULL)

libsecret_@SECRET_MAJOR@_la_SOURCES = \
	$(libsecret_PUBLIC) \
	$(libsecret_PRIVATE) \
	$(libsecret_BUILT) \
	$(NULL)

libsecret_@SECRET_MAJOR@_la_CFLAGS = \
	-DSECRET_COMPILATION \
	$(LIBGCRYPT_CFLAGS)

libsecret_@SECRET_MAJOR@_la_LDFLAGS = \
	-version-info $(SECRET_LT_RELEASE) \
	-no-undefined \
	-export-symbols-regex '^secret_|^SECRET_|^SECMEM_.*'

libsecret_@SECRET_MAJOR@_la_LIBADD = \
	libegg.la \
	$(LIBGCRYPT_LIBS) \
	$(LIBS)

BUILT_SOURCES += $(libsecret_BUILT)

noinst_LTLIBRARIES += libsecret-testable.la
libsecret_testable_la_SOURCES =
libsecret_testable_la_LIBADD = \
	$(libsecret_@SECRET_MAJOR@_la_OBJECTS) \
	$(libsecret_@SECRET_MAJOR@_la_LIBADD)
libsecret_testable_la_DEPENDENCIES = \
	$(libsecret_@SECRET_MAJOR@_la_OBJECTS) \
	$(libsecret_@SECRET_MAJOR@_la_DEPENDENCIES)
libsecret_testable_la_LDFLAGS = -rpath /force/shared

DBUS_XML_DEFINITIONS = \
	libsecret/org.freedesktop.Secrets.xml

temp-dbus-generated.c: $(DBUS_XML_DEFINITIONS) Makefile.am
	$(AM_V_GEN) gdbus-codegen --interface-prefix org.freedesktop.Secret. \
		--generate-c-code temp-dbus-generated --c-namespace SecretGen $<
secret-dbus-generated.c: temp-dbus-generated.c Makefile.am
	$(AM_V_GEN) sed -e $$'1i\\\n#define GLIB_DISABLE_DEPRECATION_WARNINGS' \
		-e 's/secret_gen_/_secret_gen_/g' -e 's/type-/type/g' \
		-e 's/temp-dbus-generated.h/secret-dbus-generated.h/g' \
		temp-dbus-generated.c > secret-dbus-generated.c
secret-dbus-generated.h: temp-dbus-generated.c Makefile.am
	$(AM_V_GEN) sed -e 's/secret_gen_/_secret_gen_/g' -e 's/type-/type/g' \
		temp-dbus-generated.h > secret-dbus-generated.h

libsecret/secret-enum-types.h: libsecret/secret-enum-types.h.template $(libsecret_HEADS)
	$(AM_V_GEN) $(GLIB_MKENUMS) --template $^ > $@

libsecret/secret-enum-types.c: libsecret/secret-enum-types.c.template $(libsecret_HEADS)
	$(AM_V_GEN) $(GLIB_MKENUMS) --template $^ > $@

# ------------------------------------------------------------------
# INTROSPECTION

if HAVE_INTROSPECTION

INTROSPECTION_GIRS += Secret-@SECRET_MAJOR@.gir

Secret-@SECRET_MAJOR@.gir: libsecret-@SECRET_MAJOR@.la

Secret_@SECRET_MAJOR@_gir_NAMESPACE = Secret
Secret_@SECRET_MAJOR@_gir_EXPORT_PACKAGES = libsecret-@SECRET_MAJOR@
Secret_@SECRET_MAJOR@_gir_INCLUDES = GObject-2.0 Gio-2.0
Secret_@SECRET_MAJOR@_gir_LIBS = libsecret-@SECRET_MAJOR@.la
Secret_@SECRET_MAJOR@_gir_CFLAGS = -I$(srcdir) -I$(builddir) -DSECRET_COMPILATION
Secret_@SECRET_MAJOR@_gir_FILES = $(libsecret_PUBLIC)
Secret_@SECRET_MAJOR@_gir_SCANNERFLAGS = --c-include "libsecret/secret.h"

gir_DATA += Secret-@SECRET_MAJOR@.gir

if ENABLE_VAPIGEN

libsecret-@SECRET_MAJOR@.vapi: Secret-@SECRET_MAJOR@.gir libsecret/Secret-@SECRET_MAJOR@.metadata libsecret-@SECRET_MAJOR@.deps

VAPIGEN_VAPIS += libsecret-@SECRET_MAJOR@.vapi

libsecret_@SECRET_MAJOR@_vapi_DEPS = glib-2.0 gio-2.0
libsecret_@SECRET_MAJOR@_vapi_METADATADIRS = $(srcdir)/libsecret
libsecret_@SECRET_MAJOR@_vapi_FILES = Secret-@SECRET_MAJOR@.gir

libsecret-$(SECRET_MAJOR).deps: Makefile.am
	$(AM_V_GEN) echo $(libsecret_@SECRET_MAJOR@_vapi_DEPS) | tr ' ' '\n' > $@

vapi_DATA += \
	libsecret-@SECRET_MAJOR@.vapi \
	libsecret-@SECRET_MAJOR@.deps
	
endif # ENABLE_VAPIGEN
endif # HAVE_INTROSPECTION

# ------------------------------------------------------------------
# PKG CONFIG

libsecret-$(SECRET_MAJOR).pc: libsecret/libsecret.pc
	$(AM_V_GEN) cp libsecret/libsecret.pc libsecret-$(SECRET_MAJOR).pc

pkgconfig_DATA += \
	libsecret-$(SECRET_MAJOR).pc \
	libsecret/libsecret-unstable.pc

EXTRA_DIST += \
	libsecret/secret-enum-types.h.template \
	libsecret/secret-enum-types.c.template \
	libsecret/org.freedesktop.Secrets.xml \
	libsecret/Secret-@SECRET_MAJOR@.metadata \
	$(NULL)

CLEANFILES += \
	temp-dbus-generated.c \
	temp-dbus-generated.h \
	$(NULL)

DISTCLEANFILES += \
	secret-dbus-generated.c \
	secret-dbus-generated.h \
	$(NULL)

# ------------------------------------------------------------------
# TESTS

noinst_LTLIBRARIES += libmock_service.la

libmock_service_la_SOURCES = \
	libsecret/mock-service.c \
	libsecret/mock-service.h \
	$(NULL)

libmock_service_la_LDFLAGS = \
	-rpath /force/shared

libmock_service_la_LIBADD = \
	$(LIBGCRYPT_LIBS)

libsecret_LIBS = \
	libsecret-testable.la \
	libmock_service.la \
	$(NULL)

C_TESTS = \
	test-attributes \
	test-value \
	test-prompt \
	test-service \
	test-session \
	test-paths \
	test-methods \
	test-password \
	test-item \
	test-collection \
	$(NULL)

test_attributes_SOURCES = libsecret/test-attributes.c
test_attributes_LDADD = $(libsecret_LIBS)

test_collection_SOURCES = libsecret/test-collection.c
test_collection_LDADD = $(libsecret_LIBS)

test_item_SOURCES = libsecret/test-item.c
test_item_LDADD = $(libsecret_LIBS)

test_methods_SOURCES = libsecret/test-methods.c
test_methods_LDADD = $(libsecret_LIBS)

test_password_SOURCES = libsecret/test-password.c
test_password_LDADD = $(libsecret_LIBS)

test_paths_SOURCES = libsecret/test-paths.c
test_paths_LDADD = $(libsecret_LIBS)

test_prompt_SOURCES = libsecret/test-prompt.c
test_prompt_LDADD = $(libsecret_LIBS)

test_service_SOURCES = libsecret/test-service.c
test_service_LDADD = $(libsecret_LIBS)

test_session_SOURCES = libsecret/test-session.c
test_session_LDADD = $(libsecret_LIBS)

test_value_SOURCES = libsecret/test-value.c
test_value_LDADD = $(libsecret_LIBS)

JS_TESTS = \
	libsecret/test-js-lookup.js \
	libsecret/test-js-clear.js \
	libsecret/test-js-store.js \
	$(NULL)

PY_TESTS = \
	libsecret/test-py-lookup.py \
	libsecret/test-py-clear.py \
	libsecret/test-py-store.py \
	$(NULL)

check_PROGRAMS += $(C_TESTS)
TESTS += $(C_TESTS) $(PY_TESTS) $(JS_TESTS)

# ------------------------------------------------------------------
# VALA TESTS

if HAVE_VALAC

VALA_V = $(VALA_V_$(V))
VALA_V_ = $(VALA_V_$(AM_DEFAULT_VERBOSITY))
VALA_V_0 = @echo "  VALAC   " $@;

VALA_TESTS_FLAGS = \
	--Xcc=-w \
	--Xcc=-I$(srcdir) \
	--Xcc=-I$(builddir) \
	--Xcc=-I$(srcdir)/libsecret \
	-X -fPIC \
	--vapidir=$(builddir) \
	--pkg libsecret-@SECRET_MAJOR@ \
	--pkg mock-service-0 \
	--pkg gio-2.0

VALA_TESTS_VAPIS = \
	libsecret-@SECRET_MAJOR@.vapi \
	mock-service-0.vapi

VALA_TESTS = \
	test-vala-lang \
	test-vala-unstable \
	$(NULL)

SUFFIXES = .vala .vala.o

test-vala-lang.vala.o: libsecret/test-vala-lang.vala $(VALA_TESTS_VAPIS)
	$(VALA_V) $(VALAC) --compile $(VALA_TESTS_FLAGS) $<
test-vala-unstable.vala.o: libsecret/test-vala-unstable.vala $(VALA_TESTS_VAPIS)
	$(VALA_V) $(VALAC) --compile --Xcc=-DSECRET_WITH_UNSTABLE=1 $(VALA_TESTS_FLAGS) $<

test_vala_lang_SOURCES =
test_vala_lang_LDADD = \
	test-vala-lang.vala.o \
	libsecret-@SECRET_MAJOR@.la \
	libmock_service.la

test_vala_unstable_SOURCES =
test_vala_unstable_LDADD = \
	test-vala-unstable.vala.o \
	libsecret-@SECRET_MAJOR@.la \
	libmock_service.la

if HAVE_INTROSPECTION
if ENABLE_VAPIGEN

check_PROGRAMS += $(VALA_TESTS)
TESTS += $(VALA_TESTS)

endif # ENABLE_VAPIGEN
endif # HAVE_INTROSPECTION

endif # HAVE_VALAC

EXTRA_DIST += \
	libsecret/test-vala-lang.vala \
	libsecret/test-vala-unstable.vala

# ------------------------------------------------------------------
# TEST INTROSPECTION

if HAVE_INTROSPECTION

INTROSPECTION_GIRS += MockService-0.gir

MockService-0.gir: libmock_service.la

MockService_0_gir_PACKAGES = gobject-2.0 gio-2.0
MockService_0_gir_EXPORT_PACKAGES = mock-service-0
MockService_0_gir_INCLUDES = GObject-2.0 Gio-2.0
MockService_0_gir_LIBS = libmock_service.la
MockService_0_gir_CFLAGS = -I$(builddir) -I$(srcdir)
MockService_0_gir_FILES = $(libmock_service_la_SOURCES)
MockService_0_gir_SCANNERFLAGS = --c-include "libsecret/mock-service.h"

noinst_DATA += MockService-0.gir MockService-0.typelib
CLEANFILES += MockService-0.gir MockService-0.typelib

if ENABLE_VAPIGEN

mock-service-0.vapi: MockService-0.gir libsecret-@SECRET_MAJOR@.vapi

mock-service-0.deps:

VAPIGEN_VAPIS += mock-service-0.vapi

mock_service_0_vapi_DEPS = gio-2.0 libsecret-@SECRET_MAJOR@
mock_service_0_vapi_METADATADIRS = $(builddir)
mock_service_0_vapi_VAPIDIRS = $(builddir)
mock_service_0_vapi_FILES = MockService-0.gir

noinst_DATA += mock-service-0.vapi

CLEANFILES += mock-service-0.vapi

endif # ENABLE_VAPIGEN
endif # HAVE_INTROSPECTION

#--------------------------------------------------------------------

EXTRA_DIST += \
	libsecret/mock \
	libsecret/mock-service-delete.py \
	libsecret/mock-service-empty.py \
	libsecret/mock-service-lock.py \
	libsecret/mock-service-normal.py \
	libsecret/mock-service-only-plain.py \
	libsecret/mock-service-prompt.py \
	$(JS_TESTS) \
	$(PY_TESTS) \
	$(NULL)
