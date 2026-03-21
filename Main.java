// Since Java 25, you can write a program without a class declaration.
// This is called an "implicitly declared class". The compiler
// automatically wraps this code in a class behind the scenes.
//
// The main method no longer needs to be "public static" or take
// a String[] args parameter. You can just write "void main()".
//
// IO.println is a simpler alternative to System.out.println.
// In implicitly declared classes, the java.io.IO class is
// automatically imported — no import statement needed.


void main() {
    IO.println("hello world");
}
