#ifndef CYTHON_BLP_BLPCONVERTEXCEPTION_H
#define CYTHON_BLP_BLPCONVERTEXCEPTION_H

#include <exception>
#include <string>
#include <utility>

namespace python_blp {
    class BlpConvertException : public std::exception {
        std::string mMessage;

    public:
        explicit BlpConvertException(const std::string& message) : mMessage(message) {

        }

        virtual ~BlpConvertException() throw() { }

        const char *what() const throw() {
            return mMessage.c_str();
        }
    };
}


#endif //CYTHON_BLP_BLPCONVERTEXCEPTION_H
