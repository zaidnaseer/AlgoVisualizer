// import React, { useState } from "react";

// const Fundamentals = () => {
//   const [activeTab, setActiveTab] = useState("intro");
//   const [copiedCode, setCopiedCode] = useState("");

//   const copyCode = async (code, identifier) => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopiedCode(identifier);
//       setTimeout(() => setCopiedCode(""), 2000);
//     } catch (err) {
//       console.error("Copy failed:", err);
//     }
//   };

//   return (
//     <div
//       className="notes-page"
//       style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
//     >
//       {/* Header */}
//       <header
//         style={{
//           textAlign: "center",
//           marginBottom: "3rem",
//           padding: "2rem 0",
//           background: "linear-gradient(135deg, #4f46e5, #4338ca)",
//           color: "white",
//           borderRadius: "12px",
//           boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
//         }}
//       >
//         <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
//           Java Fundamentals
//         </h1>
//         <p
//           style={{
//             fontSize: "1.2rem",
//             maxWidth: "700px",
//             margin: "0 auto",
//             opacity: 0.9,
//           }}
//         >
//           A comprehensive guide to Java programming for beginners. Learn core
//           concepts with clear examples and copy-ready code snippets.
//         </p>
//       </header>

//       {/* Navigation */}
//       <nav
//         style={{
//           position: "sticky",
//           top: "2rem",
//           background: "var(--card-bg, #ffffff)",
//           borderRadius: "12px",
//           padding: "1.5rem",
//           boxShadow: "var(--card-shadow, 0 6px 18px rgba(16,24,40,0.04))",
//           marginBottom: "2rem",
//           zIndex: 5,
//         }}
//       >
//         <h3 style={{ marginTop: 0, color: "var(--secondary, #0f172a)" }}>
//           <i
//             className="fas fa-bookmark"
//             style={{ marginRight: "0.5rem", color: "#4f46e5" }}
//           ></i>
//           Contents
//         </h3>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
//           {[
//             { id: "intro", label: "Introduction" },
//             { id: "setup", label: "Setup" },
//             { id: "syntax", label: "Syntax" },
//             { id: "datatypes", label: "Data Types" },
//             { id: "variables", label: "Variables" },
//             { id: "operators", label: "Operators" },
//             { id: "control", label: "Control Flow" },
//             { id: "loops", label: "Loops" },
//             { id: "methods", label: "Methods" },
//             { id: "strings", label: "Strings" },
//             { id: "arrays", label: "Arrays" },
//             { id: "classes", label: "Classes/Objects" },
//             { id: "constructors", label: "Constructors" },
//             { id: "inheritance", label: "Inheritance" },
//             { id: "polymorphism", label: "Polymorphism" },
//             { id: "encapsulation", label: "Encapsulation" },
//             { id: "exceptions", label: "Exceptions" },
//             { id: "collections", label: "Collections" },
//             { id: "interfaces", label: "Interfaces" },
//             { id: "packages", label: "Packages" },
//             { id: "filehandling", label: "File Handling" },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               style={{
//                 background: activeTab === item.id ? "#4f46e5" : "transparent",
//                 color: activeTab === item.id ? "white" : "#4f46e5",
//                 border: "2px solid #4f46e5",
//                 padding: "0.4rem 0.8rem",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 transition: "all 0.2s ease",
//                 fontSize: "0.9rem",
//               }}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* ---------- Sections ---------- */}

//       {/* Introduction */}
//       {activeTab === "intro" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-play-circle"></i> 1. Introduction to Java
//             </h2>
//             <p>
//               Java is a high-level, object-oriented, strongly-typed language
//               designed for portability, safety, and robustness. Java programs
//               compile to bytecode that runs on the Java Virtual Machine (JVM),
//               enabling cross-platform execution.
//             </p>

//             <h3>Key Features</h3>
//             <ul>
//               <li>
//                 <strong>Platform independent:</strong> Write Once, Run Anywhere
//               </li>
//               <li>
//                 <strong>Object-oriented:</strong> Encapsulation, Inheritance,
//                 Polymorphism
//               </li>
//               <li>
//                 <strong>Automatic memory management:</strong> Garbage collector
//               </li>
//               <li>
//                 <strong>Rich standard library:</strong> Collections, I/O, Concurrency
//               </li>
//             </ul>

//             <div
//               style={{
//                 background: "#fff7ed",
//                 borderLeft: "4px solid #f59e0b",
//                 padding: "1rem 1.5rem",
//                 margin: "1.5rem 0",
//                 borderRadius: "0 12px 12px 0",
//               }}
//             >
//               <strong>Note:</strong> Java was first released by Sun Microsystems
//               in 1995 and is now stewarded by Oracle and the OpenJDK community.
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Setup */}
//       {activeTab === "setup" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-cogs"></i> 2. Setting Up Java Development
//               Environment
//             </h2>

//             <h3>Install JDK</h3>
//             <p>
//               Download and install the latest OpenJDK or Oracle JDK (LTS is
//               recommended for stability). Verify with:
//               <code style={{ marginLeft: 8 }}>java -version</code>
//             </p>

//             <h3>IDE Recommendations</h3>
//             <ul>
//               <li>IntelliJ IDEA — excellent Java support</li>
//               <li>Eclipse — mature and extensible</li>
//               <li>VS Code — lightweight with Java extensions</li>
//             </ul>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "setup_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class HelloWorld {
//     public static void main(String[] args) {
//         System.out.println("Hello, Java!");
//         System.out.println("Java Version: " + System.getProperty("java.version"));
//     }
// }`,
//                     "setup_code"
//                   )
//                 }
//               >
//                 {copiedCode === "setup_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class HelloWorld {
//     public static void main(String[] args) {
//         System.out.println("Hello, Java!");
//         System.out.println("Java Version: " + System.getProperty("java.version"));
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Syntax */}
//       {activeTab === "syntax" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-code"></i> 3. Java Syntax Overview
//             </h2>
//             <p>
//               Java syntax is similar to C/C++ family: semicolons terminate
//               statements, curly braces group blocks, and classes are the primary
//               structural unit.
//             </p>

//             <h3>Basic Program Structure</h3>
//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "syntax_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `// File: Greeter.java
// public class Greeter {
//     public static void greet(String name) {
//         System.out.println("Hello, " + name);
//     }

//     public static void main(String[] args) {
//         greet("World");
//     }
// }`,
//                     "syntax_code"
//                   )
//                 }
//               >
//                 {copiedCode === "syntax_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`// File: Greeter.java
// public class Greeter {
//     public static void greet(String name) {
//         System.out.println("Hello, " + name);
//     }

//     public static void main(String[] args) {
//         greet("World");
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Data Types */}
//       {activeTab === "datatypes" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-database"></i> 4. Data Types in Java
//             </h2>
//             <p>
//               Java has primitive types (byte, short, int, long, float, double,
//               char, boolean) and reference types (String, arrays, classes).
//             </p>

//             <h3>Primitive Data Types Table</h3>
//             <div style={{ overflowX: "auto", margin: "1rem 0" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr style={{ backgroundColor: "#eef2ff" }}>
//                     <th style={{ padding: 8 }}>Type</th>
//                     <th style={{ padding: 8 }}>Size</th>
//                     <th style={{ padding: 8 }}>Default</th>
//                     <th style={{ padding: 8 }}>Notes</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[
//                     ["byte", "8 bits", "0", "Small integer"],
//                     ["short", "16 bits", "0", "Medium integer"],
//                     ["int", "32 bits", "0", "Common integer"],
//                     ["long", "64 bits", "0L", "Large integer"],
//                     ["float", "32 bits", "0.0f", "Single precision"],
//                     ["double", "64 bits", "0.0d", "Double precision"],
//                     ["char", "16 bits", "'\\u0000'", "UTF-16 character"],
//                     ["boolean", "1 bit", "false", "true/false"],
//                   ].map((r) => (
//                     <tr key={r[0]}>
//                       <td style={{ padding: 8 }}>{r[0]}</td>
//                       <td style={{ padding: 8 }}>{r[1]}</td>
//                       <td style={{ padding: 8 }}>{r[2]}</td>
//                       <td style={{ padding: 8 }}>{r[3]}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "datatypes_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class DataTypesExample {
//     public static void main(String[] args) {
//         int i = 42;
//         double d = 3.14;
//         char c = 'J';
//         boolean flag = true;
//         String s = "Java";
//         System.out.println(i + ", " + d + ", " + c + ", " + flag + ", " + s);
//     }
// }`,
//                     "datatypes_code"
//                   )
//                 }
//               >
//                 {copiedCode === "datatypes_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class DataTypesExample {
//     public static void main(String[] args) {
//         int i = 42;
//         double d = 3.14;
//         char c = 'J';
//         boolean flag = true;
//         String s = "Java";
//         System.out.println(i + ", " + d + ", " + c + ", " + flag + ", " + s);
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Variables */}
//       {activeTab === "variables" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-tag"></i> 5. Variables in Java
//             </h2>
//             <p>
//               Variables store data. Categories: local (inside methods), instance
//               (per-object), and static/class variables (shared across instances).
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "variables_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class VariableTypes {
//     String instanceVar = "instance";
//     static String staticVar = "static";

//     public void display() {
//         String localVar = "local";
//         System.out.println(localVar);
//         System.out.println(instanceVar);
//         System.out.println(staticVar);
//     }

//     public static void main(String[] args) {
//         System.out.println(VariableTypes.staticVar);
//         VariableTypes obj = new VariableTypes();
//         obj.display();
//     }
// }`,
//                     "variables_code"
//                   )
//                 }
//               >
//                 {copiedCode === "variables_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class VariableTypes {
//     String instanceVar = "instance";
//     static String staticVar = "static";

//     public void display() {
//         String localVar = "local";
//         System.out.println(localVar);
//         System.out.println(instanceVar);
//         System.out.println(staticVar);
//     }

//     public static void main(String[] args) {
//         System.out.println(VariableTypes.staticVar);
//         VariableTypes obj = new VariableTypes();
//         obj.display();
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Operators */}
//       {activeTab === "operators" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-calculator"></i> 6. Operators
//             </h2>
//             <p>
//               Java supports arithmetic, relational, logical, bitwise, assignment,
//               and ternary operators.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "operators_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class OperatorsExample {
//     public static void main(String[] args) {
//         int a = 10, b = 3;
//         System.out.println(a + b); // 13
//         System.out.println(a - b); // 7
//         System.out.println(a * b); // 30
//         System.out.println(a / b); // 3
//         System.out.println(a % b); // 1
//         System.out.println(a > b && b > 0); // true
//         System.out.println(a == 10 ? "ten" : "not ten"); // ten
//     }
// }`,
//                     "operators_code"
//                   )
//                 }
//               >
//                 {copiedCode === "operators_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class OperatorsExample {
//     public static void main(String[] args) {
//         int a = 10, b = 3;
//         System.out.println(a + b); // 13
//         System.out.println(a - b); // 7
//         System.out.println(a * b); // 30
//         System.out.println(a / b); // 3
//         System.out.println(a % b); // 1
//         System.out.println(a > b && b > 0); // true
//         System.out.println(a == 10 ? "ten" : "not ten"); // ten
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Control Flow */}
//       {activeTab === "control" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-sitemap"></i> 7. Control Flow Statements
//             </h2>
//             <p>
//               Control flow includes conditional branching (`if`, `switch`) and
//               handling repetition (loops are covered separately).
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "control_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class ControlFlowExample {
//     public static void main(String[] args) {
//         int score = 85;
//         if (score >= 90) {
//             System.out.println("A");
//         } else if (score >= 80) {
//             System.out.println("B");
//         } else {
//             System.out.println("C");
//         }

//         int day = 3;
//         switch (day) {
//             case 1: System.out.println("Mon"); break;
//             case 2: System.out.println("Tue"); break;
//             case 3: System.out.println("Wed"); break;
//             default: System.out.println("Other");
//         }
//     }
// }`,
//                     "control_code"
//                   )
//                 }
//               >
//                 {copiedCode === "control_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class ControlFlowExample {
//     public static void main(String[] args) {
//         int score = 85;
//         if (score >= 90) {
//             System.out.println("A");
//         } else if (score >= 80) {
//             System.out.println("B");
//         } else {
//             System.out.println("C");
//         }

//         int day = 3;
//         switch (day) {
//             case 1: System.out.println("Mon"); break;
//             case 2: System.out.println("Tue"); break;
//             case 3: System.out.println("Wed"); break;
//             default: System.out.println("Other");
//         }
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Loops */}
//       {activeTab === "loops" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-redo"></i> 8. Loops
//             </h2>
//             <p>
//               Java provides `for`, `while`, and `do-while`. Use for-each for arrays
//               and collections.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "loops_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class LoopsExample {
//     public static void main(String[] args) {
//         for (int i = 0; i < 3; i++) System.out.println(i);
//         int j = 0;
//         while (j < 3) { System.out.println(j); j++; }
//         int k = 0;
//         do { System.out.println(k); k++; } while (k < 3);
//     }
// }`,
//                     "loops_code"
//                   )
//                 }
//               >
//                 {copiedCode === "loops_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class LoopsExample {
//     public static void main(String[] args) {
//         for (int i = 0; i < 3; i++) System.out.println(i);
//         int j = 0;
//         while (j < 3) { System.out.println(j); j++; }
//         int k = 0;
//         do { System.out.println(k); k++; } while (k < 3);
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Methods */}
//       {activeTab === "methods" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-hand-pointer"></i> 9. Methods
//             </h2>
//             <p>
//               Methods define reusable behavior. Java supports method overloading
//               (same name, different parameters) and static vs instance methods.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "methods_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class MethodsExample {
//     public static int add(int a, int b) { return a + b; }
//     public static double add(double a, double b) { return a + b; } // overloaded

//     public static void main(String[] args) {
//         System.out.println(add(2,3));
//         System.out.println(add(2.5, 3.5));
//     }
// }`,
//                     "methods_code"
//                   )
//                 }
//               >
//                 {copiedCode === "methods_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class MethodsExample {
//     public static int add(int a, int b) { return a + b; }
//     public static double add(double a, double b) { return a + b; } // overloaded

//     public static void main(String[] args) {
//         System.out.println(add(2,3));
//         System.out.println(add(2.5, 3.5));
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Strings */}
//       {activeTab === "strings" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-font"></i> 10. Strings
//             </h2>
//             <p>
//               `String` is an immutable sequence of characters. Use `StringBuilder`
//               or `StringBuffer` for mutable strings.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "strings_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class StringsExample {
//     public static void main(String[] args) {
//         String s = "Hello";
//         String t = s + " World";
//         System.out.println(t.toUpperCase());
//         System.out.println(t.substring(6));
//         StringBuilder sb = new StringBuilder();
//         sb.append("a").append("b");
//         System.out.println(sb.toString());
//     }
// }`,
//                     "strings_code"
//                   )
//                 }
//               >
//                 {copiedCode === "strings_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class StringsExample {
//     public static void main(String[] args) {
//         String s = "Hello";
//         String t = s + " World";
//         System.out.println(t.toUpperCase());
//         System.out.println(t.substring(6));
//         StringBuilder sb = new StringBuilder();
//         sb.append("a").append("b");
//         System.out.println(sb.toString());
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Arrays */}
//       {activeTab === "arrays" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-th-large"></i> 11. Arrays
//             </h2>
//             <p>
//               Arrays are fixed-size containers for elements of the same type.
//               For flexible collections prefer `ArrayList`.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "arrays_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class ArraysExample {
//     public static void main(String[] args) {
//         int[] arr = {1,2,3,4};
//         for (int v : arr) System.out.println(v);
//         int[][] mat = { {1,2}, {3,4} };
//         System.out.println(mat[1][0]); // 3
//     }
// }`,
//                     "arrays_code"
//                   )
//                 }
//               >
//                 {copiedCode === "arrays_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class ArraysExample {
//     public static void main(String[] args) {
//         int[] arr = {1,2,3,4};
//         for (int v : arr) System.out.println(v);
//         int[][] mat = { {1,2}, {3,4} };
//         System.out.println(mat[1][0]); // 3
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Classes/Objects */}
//       {activeTab === "classes" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-cubes"></i> 12. Classes & Objects
//             </h2>
//             <p>
//               Classes are blueprints; objects are instances. Use access
//               modifiers (public, private, protected) to control visibility.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "classes_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class Car {
//     private String model;
//     private int year;

//     public Car(String model, int year) {
//         this.model = model;
//         this.year = year;
//     }

//     public String getModel() { return model; }
//     public int getYear() { return year; }

//     public static void main(String[] args) {
//         Car c = new Car("Toyota", 2020);
//         System.out.println(c.getModel() + " - " + c.getYear());
//     }
// }`,
//                     "classes_code"
//                   )
//                 }
//               >
//                 {copiedCode === "classes_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class Car {
//     private String model;
//     private int year;

//     public Car(String model, int year) {
//         this.model = model;
//         this.year = year;
//     }

//     public String getModel() { return model; }
//     public int getYear() { return year; }

//     public static void main(String[] args) {
//         Car c = new Car("Toyota", 2020);
//         System.out.println(c.getModel() + " - " + c.getYear());
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Constructors */}
//       {activeTab === "constructors" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-tools"></i> 13. Constructors
//             </h2>
//             <p>
//               Constructors initialize objects. Default constructor is provided
//               if none is declared. Use `this(...)` to chain constructors.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "constructors_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class Person {
//     private String name;
//     public Person() { this("Unknown"); }
//     public Person(String name) { this.name = name; }
//     public String getName() { return name; }
//     public static void main(String[] args) {
//         Person p = new Person("Asha");
//         System.out.println(p.getName());
//     }
// }`,
//                     "constructors_code"
//                   )
//                 }
//               >
//                 {copiedCode === "constructors_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class Person {
//     private String name;
//     public Person() { this("Unknown"); }
//     public Person(String name) { this.name = name; }
//     public String getName() { return name; }
//     public static void main(String[] args) {
//         Person p = new Person("Asha");
//         System.out.println(p.getName());
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Inheritance */}
//       {activeTab === "inheritance" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-share-alt"></i> 14. Inheritance
//             </h2>
//             <p>
//               Inheritance lets a class derive from another (extends). Use it to
//               reuse code. Java supports single inheritance for classes.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "inheritance_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `class Animal {
//     void speak() { System.out.println("Animal sound"); }
// }
// class Dog extends Animal {
//     @Override void speak() { System.out.println("Bark"); }
// }
// public class InheritanceExample {
//     public static void main(String[] args) {
//         Animal a = new Dog();
//         a.speak(); // Bark
//     }
// }`,
//                     "inheritance_code"
//                   )
//                 }
//               >
//                 {copiedCode === "inheritance_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`class Animal {
//     void speak() { System.out.println("Animal sound"); }
// }
// class Dog extends Animal {
//     @Override void speak() { System.out.println("Bark"); }
// }
// public class InheritanceExample {
//     public static void main(String[] args) {
//         Animal a = new Dog();
//         a.speak(); // Bark
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Polymorphism */}
//       {activeTab === "polymorphism" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-exchange-alt"></i> 15. Polymorphism
//             </h2>
//             <p>
//               Polymorphism allows objects to be treated as instances of their
//               parent type. Method overriding is runtime polymorphism.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "polymorphism_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `interface Shape { double area(); }
// class Circle implements Shape {
//     double r;
//     Circle(double r){this.r=r;}
//     public double area(){ return Math.PI*r*r; }
// }
// class Rectangle implements Shape {
//     double w,h;
//     Rectangle(double w,double h){this.w=w;this.h=h;}
//     public double area(){ return w*h; }
// }
// public class PolyExample {
//     public static void main(String[] args) {
//         Shape s1 = new Circle(2);
//         Shape s2 = new Rectangle(3,4);
//         System.out.println(s1.area());
//         System.out.println(s2.area());
//     }
// }`,
//                     "polymorphism_code"
//                   )
//                 }
//               >
//                 {copiedCode === "polymorphism_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`interface Shape { double area(); }
// class Circle implements Shape {
//     double r;
//     Circle(double r){this.r=r;}
//     public double area(){ return Math.PI*r*r; }
// }
// class Rectangle implements Shape {
//     double w,h;
//     Rectangle(double w,double h){this.w=w;this.h=h;}
//     public double area(){ return w*h; }
// }
// public class PolyExample {
//     public static void main(String[] args) {
//         Shape s1 = new Circle(2);
//         Shape s2 = new Rectangle(3,4);
//         System.out.println(s1.area());
//         System.out.println(s2.area());
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Encapsulation */}
//       {activeTab === "encapsulation" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-lock"></i> 16. Encapsulation
//             </h2>
//             <p>
//               Encapsulation hides internal state and exposes behavior via methods.
//               Use private fields and public getters/setters.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "encapsulation_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class BankAccount {
//     private double balance;
//     public BankAccount(double b){this.balance=b;}
//     public double getBalance(){return balance;}
//     public void deposit(double a){ if(a>0) balance+=a;}
// }`,
//                     "encapsulation_code"
//                   )
//                 }
//               >
//                 {copiedCode === "encapsulation_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class BankAccount {
//     private double balance;
//     public BankAccount(double b){this.balance=b;}
//     public double getBalance(){return balance;}
//     public void deposit(double a){ if(a>0) balance+=a;}
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Exceptions */}
//       {activeTab === "exceptions" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-exclamation-triangle"></i> 17. Exceptions
//             </h2>
//             <p>
//               Exceptions handle errors. Use `try-catch-finally` and declare
//               checked exceptions with `throws`.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "exceptions_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `public class ExceptionsExample {
//     public static void main(String[] args) {
//         try {
//             int x = 10 / 0;
//         } catch (ArithmeticException ex) {
//             System.out.println("Divide by zero: " + ex.getMessage());
//         } finally {
//             System.out.println("Always runs");
//         }
//     }
// }`,
//                     "exceptions_code"
//                   )
//                 }
//               >
//                 {copiedCode === "exceptions_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`public class ExceptionsExample {
//     public static void main(String[] args) {
//         try {
//             int x = 10 / 0;
//         } catch (ArithmeticException ex) {
//             System.out.println("Divide by zero: " + ex.getMessage());
//         } finally {
//             System.out.println("Always runs");
//         }
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Collections */}
//       {activeTab === "collections" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-layer-group"></i> 18. Collections
//             </h2>
//             <p>
//               The Collections Framework includes `List`, `Set`, `Map`, `Queue`.
//               Use `ArrayList` for dynamic arrays and `HashMap` for key-value pairs.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "collections_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `import java.util.*;
// public class CollectionsExample {
//     public static void main(String[] args) {
//         List<String> list = new ArrayList<>();
//         list.add("a"); list.add("b");
//         Map<String,Integer> map = new HashMap<>();
//         map.put("x", 1);
//         for(String s : list) System.out.println(s);
//         System.out.println(map.get("x"));
//     }
// }`,
//                     "collections_code"
//                   )
//                 }
//               >
//                 {copiedCode === "collections_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`import java.util.*;
// public class CollectionsExample {
//     public static void main(String[] args) {
//         List<String> list = new ArrayList<>();
//         list.add("a"); list.add("b");
//         Map<String,Integer> map = new HashMap<>();
//         map.put("x", 1);
//         for(String s : list) System.out.println(s);
//         System.out.println(map.get("x"));
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Interfaces */}
//       {activeTab === "interfaces" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-network-wired"></i> 19. Interfaces
//             </h2>
//             <p>
//               Interfaces define contracts (methods) that implementing classes
//               must provide. Since Java 8, interfaces can have default methods.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "interfaces_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `interface Printable { void print(); }
// class Doc implements Printable {
//     public void print(){ System.out.println("Doc print"); }
// }
// public class InterfaceExample {
//     public static void main(String[] args) {
//         Printable p = new Doc();
//         p.print();
//     }
// }`,
//                     "interfaces_code"
//                   )
//                 }
//               >
//                 {copiedCode === "interfaces_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`interface Printable { void print(); }
// class Doc implements Printable {
//     public void print(){ System.out.println("Doc print"); }
// }
// public class InterfaceExample {
//     public static void main(String[] args) {
//         Printable p = new Doc();
//         p.print();
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Packages */}
//       {activeTab === "packages" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-folder-open"></i> 20. Packages
//             </h2>
//             <p>
//               Packages group related classes and avoid name clashes. Use
//               `package com.example;` at the top of files and organize folders
//               accordingly.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "packages_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `// File path: com/example/util/Utils.java
// package com.example.util;
// public class Utils {
//     public static String greet(String name){ return "Hi " + name; }
// }`,
//                     "packages_code"
//                   )
//                 }
//               >
//                 {copiedCode === "packages_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`// File path: com/example/util/Utils.java
// package com.example.util;
// public class Utils {
//     public static String greet(String name){ return "Hi " + name; }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* File Handling */}
//       {activeTab === "filehandling" && (
//         <section style={{ marginBottom: "2rem" }}>
//           <div className="card">
//             <h2>
//               <i className="fas fa-file-alt"></i> 21. File Handling
//             </h2>
//             <p>
//               Use `java.nio.file` and `java.io` to read/write files. Prefer
//               `Files` utility methods for concise code.
//             </p>

//             <div className="code-container">
//               <button
//                 className={`copy-btn ${copiedCode === "filehandling_code" ? "copied" : ""}`}
//                 onClick={() =>
//                   copyCode(
// `import java.nio.file.*;
// import java.io.IOException;
// public class FileExample {
//     public static void main(String[] args) throws IOException {
//         Path p = Paths.get("example.txt");
//         Files.writeString(p, "Hello file");
//         String content = Files.readString(p);
//         System.out.println(content);
//     }
// }`,
//                     "filehandling_code"
//                   )
//                 }
//               >
//                 {copiedCode === "filehandling_code" ? "Copied!" : "Copy"}
//               </button>
//               <pre>{`import java.nio.file.*;
// import java.io.IOException;
// public class FileExample {
//     public static void main(String[] args) throws IOException {
//         Path p = Paths.get("example.txt");
//         Files.writeString(p, "Hello file");
//         String content = Files.readString(p);
//         System.out.println(content);
//     }
// }`}</pre>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ---------- End Sections ---------- */}

//       <style jsx>{`
//         .notes-page {
//           font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//           line-height: 1.6;
//           color: #374151;
//         }

//         .card {
//           background: var(--card-bg, #ffffff);
//           border-radius: 12px;
//           box-shadow: var(--card-shadow, 0 6px 18px rgba(16, 24, 40, 0.04));
//           border: var(--card-border, 1px solid rgba(15, 23, 42, 0.03));
//           padding: 1.5rem;
//           margin-bottom: 2rem;
//           transition: all 0.3s ease;
//         }

//         .card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 12px 25px rgba(16, 24, 40, 0.1);
//         }

//         h2 {
//           color: var(--code-text);
//           margin-bottom: 1rem;
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         h3 {
//           color: #4f46e5;
//           margin: 1.2rem 0 0.5rem;
//           font-weight: 600;
//         }

//         .code-container {
//           position: relative;
//           margin: 1.2rem 0;
//           border-radius: 12px;
//           overflow: hidden;
//         }

//         .code-container pre {
//           background: var(--code-bg, #0b1220);
//           color: var(--code-text, #e6eef8);
//           padding: 1.2rem;
//           overflow-x: auto;
//           border-radius: 12px;
//           font-family: "Courier New", monospace;
//           line-height: 1.5;
//           font-size: 0.95rem;
//           margin: 0;
//         }
//         p {
//           color: var(--code-text, #111827);
//         }

//         .copy-btn {
//           position: absolute;
//           top: 0.7rem;
//           right: 0.7rem;
//           background: rgba(255, 255, 255, 0.06);
//           color: var(--code-text, #e6eef8);
//           border: none;
//           padding: 0.45rem 0.9rem;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 0.85rem;
//           transition: all 0.2s ease;
//           backdrop-filter: blur(6px);
//         }

//         .copy-btn:hover {
//           background: rgba(255, 255, 255, 0.12);
//         }

//         .copy-btn.copied {
//           background: #10b981;
//           color: white;
//         }

//         code {
//           background-color: #e0e7ff;
//           color: #4338ca;
//           padding: 0.2rem 0.4rem;
//           border-radius: 4px;
//           font-family: "Courier New", monospace;
//           font-size: 0.9rem;
//         }

//         ul {
//           padding-left: 1.5rem;
//           margin-bottom: 1rem;
//           color: var(--code-text, #111827);
//         }

//         li {
//           color: var(--code-text, #111827);
//           margin-bottom: 0.4rem;
//         }

//         strong {
//           color: var(--code-text, #0f172a);
//         }

//         /* small responsive tweaks */
//         @media (max-width: 700px) {
//           .notes-page {
//             padding: 1rem;
//           }
//           nav {
//             top: 1rem;
//           }
//           .copy-btn {
//             padding: 0.35rem 0.6rem;
//             font-size: 0.78rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Fundamentals;


import React, { useState } from "react";
import IntroSection from "./sections/IntroSection";
import SetupSection from "./sections/SetupSection";
import SyntaxSection from "./sections/SyntaxSection";
import DataTypesSection from "./sections/DataTypesSection";
import VariablesSection from "./sections/VariablesSection";
import OperatorsSection from "./sections/OperatorsSection";
import ControlFlowSection from "./sections/ControlFlowSection";
import MethodsSection from "./sections/MethodsSection";
import OOPSection from "./sections/OOPSection";
import StringsSection from "./sections/StringsSection";
import ArraysSection from "./sections/ArraysSection";
import LoopsSection from "./sections/LoopsSection";
import ClassesSection from "./sections/ClassesSection";
import InheritanceSection from "./sections/InheritanceSection";
import PolymorphismSection from "./sections/PolymorphismSection";
import EncapsulationSection from "./sections/EncapsulationSection";
import ConstructorsSection from "./sections/ConstructorsSection";
import ExceptionsSection from "./sections/ExceptionsSection";
import CollectionsSection from "./sections/CollectionsSection";
import InterfacesSection from "./sections/InterfacesSection";
import PackagesSection from "./sections/PackagesSection";
import FileHandlingSection from "./sections/FileHandlingSection";

const Fundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code, identifier) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const sections = [
    { id: "intro", label: "Introduction", component: <IntroSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "setup", label: "Setup", component: <SetupSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "syntax", label: "Syntax", component: <SyntaxSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "datatypes", label: "Data Types", component: <DataTypesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "variables", label: "Variables", component: <VariablesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "operators", label: "Operators", component: <OperatorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "control", label: "Control Flow", component: <ControlFlowSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "methods", label: "Methods", component: <MethodsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "oop", label: "OOP Concepts", component: <OOPSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "strings", label: "Strings", component: <StringsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "arrays", label: "Arrays", component: <ArraysSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "loops", label: "Loops", component: <LoopsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "classes", label: "Classes/Objects", component: <ClassesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "inheritance", label: "Inheritance", component: <InheritanceSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "polymorphism", label: "Polymorphism", component: <PolymorphismSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "encapsulation", label: "Encapsulation", component: <EncapsulationSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "constructors", label: "Constructors", component: <ConstructorsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "exceptions", label: "Exceptions", component: <ExceptionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "collections", label: "Collections", component: <CollectionsSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "interfaces", label: "Interfaces", component: <InterfacesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "packages", label: "Packages", component: <PackagesSection copyCode={copyCode} copiedCode={copiedCode} /> },
    { id: "filehandling", label: "File Handling", component: <FileHandlingSection copyCode={copyCode} copiedCode={copiedCode} /> },
  ];

  return (
    <div className="notes-page" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #4f46e5, #4338ca)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>Java Fundamentals</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: 0.9 }}>
          A comprehensive guide to Java programming for beginners. Learn core concepts with detailed explanations and runnable examples you can copy.
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          position: "sticky",
          top: "2rem",
          background: "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#0f172a" }}>
          <i className="fas fa-bookmark" style={{ marginRight: "0.5rem", color: "#4f46e5" }}></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? "#4f46e5" : "transparent",
                color: activeTab === item.id ? "white" : "#4f46e5",
                border: "2px solid #4f46e5",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Section Renderer */}
      <div style={{ marginTop: "1rem" }}>
        {sections.find((s) => s.id === activeTab)?.component}
      </div>

      <style jsx>{`
        .notes-page {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #374151;
        }

        .card {
          background: var(--card-bg, #ffffff);
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(16, 24, 40, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.03);
          padding: 1.5rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(16, 24, 40, 0.1);
        }

        h2 {
          color: var(--code-text, #1e293b);
          margin-bottom: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        h3 {
          color: #4f46e5;
          margin: 1.5rem 0 0.5rem;
          font-weight: 600;
        }

        .code-container {
          position: relative;
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
        }

        .code-container pre {
          background: var(--code-bg, #0b1220);
          color: var(--code-text, #f8fafc);
          padding: 1.5rem;
          overflow-x: auto;
          border-radius: 12px;
          font-family: "Courier New", monospace;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        p {
          color: var(--code-text, #374151);
        }

        .copy-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          color: var(--code-text, #374151);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .copy-btn.copied {
          background: #10b981;
        }

        code {
          background-color: #e0e7ff;
          color: #4338ca;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: "Courier New", monospace;
          font-size: 0.9rem;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: var(--code-text, #374151);
        }

        li {
          color: var(--code-text, #374151);
          margin-bottom: 0.5rem;
        }

        strong {
          color: var(--code-text, #374151);
        }
      `}</style>
    </div>
  );
};

export default Fundamentals;
