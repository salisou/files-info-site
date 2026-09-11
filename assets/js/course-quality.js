(function(){
  'use strict';

  const courses = window.MOUSSA_LANGUAGE_COURSES || {};

  // Quality corrections for examples that must compile as complete programs.
  const overrides = {
    java: [
      'public class Main {\n  public static void main(String[] args) {\n    String nome = "Moussa";\n    int eta = 30;\n    System.out.println(nome + " ha " + eta + " anni");\n  }\n}',
      'public class Main {\n  public static void main(String[] args) {\n    int voto = 27;\n    String esito = voto >= 18 ? "Superato" : "Non superato";\n    System.out.println(esito);\n  }\n}',
      'public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i <= 5; i++) {\n      System.out.println(i);\n    }\n  }\n}',
      'public class Main {\n  static int somma(int a, int b) {\n    return a + b;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(somma(2, 3));\n  }\n}',
      'public class Main {\n  static class Studente {\n    String nome;\n    int voto;\n\n    Studente(String nome, int voto) {\n      this.nome = nome;\n      this.voto = voto;\n    }\n  }\n\n  public static void main(String[] args) {\n    Studente s = new Studente("Amina", 28);\n    System.out.println(s.nome + ": " + s.voto);\n  }\n}',
      'import java.util.Arrays;\n\npublic class Main {\n  public static void main(String[] args) {\n    int[] voti = {18, 25, 30};\n    System.out.println(Arrays.toString(voti));\n  }\n}'
    ],
    php: [
      '<?php\n$nome = "Moussa";\necho "Ciao $nome";\n',
      '<?php\n$eta = 30;\n$media = 28.5;\necho $eta . " " . $media;\n',
      '<?php\n$voto = 27;\n$esito = $voto >= 18 ? "Superato" : "Non superato";\necho $esito;\n',
      '<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i . PHP_EOL;\n}\n',
      '<?php\n$studenti = ["Amina" => 28, "Luca" => 24];\nforeach ($studenti as $nome => $voto) {\n    echo $nome . ": " . $voto . PHP_EOL;\n}\n',
      '<?php\nfunction somma(int $a, int $b): int {\n    return $a + $b;\n}\n\necho somma(2, 3);\n'
    ],
    go: [
      'package main\n\nimport "fmt"\n\nfunc main() {\n    nome := "Moussa"\n    eta := 30\n    fmt.Println(nome, eta)\n}',
      'package main\n\nimport "fmt"\n\nfunc main() {\n    voto := 27\n    if voto >= 18 {\n        fmt.Println("Superato")\n    } else {\n        fmt.Println("Non superato")\n    }\n}',
      'package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 5; i++ {\n        fmt.Println(i)\n    }\n}',
      'package main\n\nimport "fmt"\n\nfunc somma(a, b int) int {\n    return a + b\n}\n\nfunc main() {\n    fmt.Println(somma(2, 3))\n}',
      'package main\n\nimport "fmt"\n\ntype Studente struct {\n    Nome string\n    Voto int\n}\n\nfunc main() {\n    s := Studente{Nome: "Amina", Voto: 28}\n    fmt.Println(s.Nome, s.Voto)\n}',
      'package main\n\nimport "fmt"\n\nfunc main() {\n    voti := []int{18, 25, 30}\n    studenti := map[string]int{"Amina": 28}\n    fmt.Println(voti, studenti)\n}'
    ],
    csharp: [
      'using System;\n\nstring nome = "Moussa";\nint eta = 30;\nConsole.WriteLine($"{nome} ha {eta} anni");',
      'using System;\n\nint voto = 27;\nstring esito = voto switch\n{\n    >= 18 => "Superato",\n    _ => "Non superato"\n};\nConsole.WriteLine(esito);',
      'using System;\n\nfor (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine(i);\n}',
      'using System;\n\nint Somma(int a, int b) => a + b;\nConsole.WriteLine(Somma(2, 3));',
      'using System;\n\nclass Studente\n{\n    public string Nome { get; set; } = "Amina";\n    public int Voto { get; set; } = 28;\n}\n\nvar s = new Studente();\nConsole.WriteLine($"{s.Nome}: {s.Voto}");',
      'using System;\n\ninterface INotifica\n{\n    void Invia();\n}\n\nclass Email : INotifica\n{\n    public void Invia() => Console.WriteLine("Email inviata");\n}\n\nvar notifica = new Email();\nnotifica.Invia();'
    ]
  };

  Object.entries(overrides).forEach(([key, examples]) => {
    if (courses[key]) courses[key].examples = examples;
  });

  // These technologies are not realistically executable inside a generic compiler iframe.
  const localOnly = ['tkinter', 'blazor', 'maui', 'aspnet', 'python_data', 'sqlserver'];
  localOnly.forEach(key => {
    if (courses[key]) courses[key].labMode = 'reference';
  });

  // Metadata used by the platform to distinguish a real course from a simple code sample.
  Object.values(courses).forEach(course => {
    course.courseStandard = 'foundation';
    course.hasExercises = true;
    course.hasSolutions = true;
    course.hasQuiz = true;
  });
})();
