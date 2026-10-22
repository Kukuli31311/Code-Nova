import { tf, mc, ms } from './types'
import type { Q, Lesson } from './types'

export const CS: Lesson[] = [
  {
    id: 'cs1', t: 'C# 1: Temeller',
    slides: [
      {
        h: 'C# nedir?',
        b: '<p><b>C#</b> (\"si şarp\" diye okunur) Microsoft un geliştirdiği güçlü bir dildir. Unity ile yapılan oyunlarda, Windows programlarında ve web sitelerinde kullanılır.</p><p>Kod yine yukarıdan aşağıya sırayla çalışır. <code>Console.WriteLine()</code> ekrana yazı yazdırır. Her komutun sonuna <b>noktalı virgül</b> <code>;</code> konur.</p>',
        code: 'Console.WriteLine("Merhaba Dünya");\nConsole.WriteLine("Ben C# öğreniyorum");',
        hard: 'Her komutun sonunda ; olmalı, unutursan program çalışmaz. Büyük küçük harf de önemlidir: Console yazılır, console değil.',
      },
      {
        h: 'Değişken ve tür yazma',
        b: '<p>C# ta kutuyu yaparken türünü <b>başa</b> yazarız: <code>int yas = 12;</code>. Tür sadece ilk tanımlarken yazılır. Sonra değiştirmek için sadece <code>yas = 13;</code> yazarız.</p><p>Hiç değişmeyecek değerler için <code>const</code> kullanılır.</p>',
        code: 'int yas = 12;\nConsole.WriteLine(yas);   // 12\nyas = 13;\nConsole.WriteLine(yas);   // 13\nconst string OKUL = "Nova";   // const: değişmez',
        hard: 'Türü sadece ilk tanımda yaz. yas = 13; satırının başına tekrar int yazarsan hata alırsın.',
      },
      {
        h: 'Veri türleri',
        b: '<p>C# ta dört önemli tür vardır: <code>int</code> tam sayı, <code>double</code> ondalıklı sayı, <code>string</code> yazı, <code>bool</code> doğru/yanlış.</p><p>Yazılar çift tırnak içine alınır. <code>true</code> ve <code>false</code> küçük harfle yazılır.</p>',
        code: 'int sayi = 12;\ndouble ondalik = 3.5;\nstring ad = "Ada";\nbool varMi = true;\nConsole.WriteLine("12" + "3");   // 123',
        hard: 'Türler küçük harfle yazılır: int, string, bool. Yazı için çift tırnak kullan, tek tırnak sadece tek harf içindir.',
      },
      {
        h: 'Hesap yapma ve yazı içine değer',
        b: '<p>İşaretler Python daki gibidir: <code>+</code> <code>-</code> <code>*</code> <code>/</code> ve kalan için <code>%</code>.</p><p>Yazının içine değişken koymak için tırnaktan önce <code>$</code> yazarız, değişkeni de süslü parantez içine alırız: <code>$"Merhaba {ad}"</code>.</p>',
        code: 'Console.WriteLine(7 / 2);     // 3\nConsole.WriteLine(7 / 2.0);   // 3.5\nConsole.WriteLine(7 % 2);     // 1\nstring ad = "Ada";\nConsole.WriteLine($"Merhaba {ad}");   // Merhaba Ada',
        hard: 'İki tam sayıyı bölersen sonuç da tam sayı olur: 7 / 2 sonucu 3 tür. $ işaretini unutursan {ad} aynen ekrana yazılır.',
      },
      {
        h: 'ReadLine ile soru sorma',
        b: '<p><code>Console.ReadLine()</code> kullanıcının yazdığı cevabı alır. Python daki <code>input()</code> ile aynı işi yapar.</p><p>Cevap her zaman <b>string</b> olarak gelir. Sayı olarak kullanmak için <code>int.Parse( )</code> ile çeviririz.</p>',
        code: 'string ad = Console.ReadLine();\nConsole.WriteLine($"Merhaba {ad}");\nint yas = int.Parse(Console.ReadLine());\nConsole.WriteLine($"Seneye {yas + 1}");',
        hard: 'ReadLine() her zaman string verir. int.Parse() kullanmazsan yas + 1 hesabı yapılamaz.',
      },
    ],
    review: 'C# kodu sırayla çalışır ve her komut ; ile biter. Değişken tanımlanırken tür başa yazılır: int, double, string, bool. Tür sadece ilk tanımda yazılır. Tam sayıların bölümü tam sayı çıkar. Yazı içine $"{ad}" ile değer konur. ReadLine() string verir, sayı için int.Parse() gerekir.',
    ex: [
      [
        tf('C# ta her komutun sonuna noktalı virgül konur.', true, 'Komut ; ile biter.'),
        mc('Hangisi bir string değeridir?', ['7', '3.5', '"merhaba"', 'true'], 2, 'Çift tırnak içindeki değer string dir.'),
        ms('Hangi iki satır doğru bir değişken tanımıdır?', ['int puan = 90;', 'puan int = 90;', 'string ad = "Can";', 'string = ad "Can";'], [0, 2], 'Önce tür, sonra ad, sonra = ve değer yazılır.'),
        mc('Console.WriteLine(7 / 2); ne yazdırır?', ['3.5', '3', '4', '2'], 1, 'İki int bölününce sonuç da int olur: 3.'),
        mc('Console.WriteLine(10 % 3); ne yazdırır?', ['1', '3', '0', '3.33'], 0, '% kalanı verir. 10 = 3 x 3 + 1, kalan 1 dir.'),
      ],
      [
        mc('C# ta ekrana yazıp alt satıra geçen komut hangisidir?', ['Console.WriteLine()', 'print()', 'println()', 'echo()'], 0, 'C# ta Console.WriteLine() kullanılır.'),
        tf('3.5 değeri int türündedir.', false, 'Ondalıklı sayılar double türündedir.'),
        ms('Hangi iki değer sayıdır?', ['10', '"10"', '2.5', '"2.5"'], [0, 2], 'Tırnaksız değerler sayıdır.'),
        mc('int a = 4; a = 9; yazarsan a kaç olur?', ['4', '9', '13', 'hata'], 1, 'Yeni değer eskisinin yerine geçer.'),
        mc('Console.ReadLine() ile alınan değer hangi türdedir?', ['int', 'double', 'string', 'bool'], 2, 'ReadLine() her zaman string verir.'),
      ],
      [
        mc('Hangisi bir double sayıdır?', ['8', '"8.5"', '8.5', 'false'], 2, 'Tırnaksız ve noktalı sayı double dır.'),
        tf('"Ada" bir string değeridir.', true, 'Tırnak içinde olduğu için string dir.'),
        ms('Hangi iki tanım doğrudur?', ['int sayi = 3;', '3 = int sayi;', 'string isim = "Can";', '"Can" = string isim;'], [0, 2], 'Tanımda önce tür, sonra ad gelir.'),
        mc('string ad = "Ece"; Console.WriteLine($"Merhaba {ad}"); ne görürsün?', ['Merhaba {ad}', 'Merhaba Ece', 'Merhaba "Ece"', 'hata'], 1, '{ad} yerine değişkenin değeri yazılır.'),
        mc('Console.WriteLine(3 * 4); ne yazdırır?', ['34', '12', '7', 'hata'], 1, '* çarpma yapar. 3 x 4 = 12.'),
      ],
    ],
  },
  {
    id: 'cs2', t: 'C# 2: Koşullar',
    slides: [
      {
        h: 'if ile karar ver',
        b: '<p><code>if</code> \"eğer\" demektir. Koşulu <b>parantez</b> içine yazarız. Doğruysa süslü parantez içindeki satırlar çalışır.</p><p>Python da iki nokta ve girinti kullanıyorduk. C# ta bunların yerine <code>( )</code> ve <code>{ }</code> var.</p>',
        code: 'int yas = 13;\nif (yas >= 12)\n{\n    Console.WriteLine("Ortaokul öğrencisisin");\n}\nConsole.WriteLine("Bu satır her zaman çalışır");',
        hard: 'Koşul ( ) içine, çalışacak satırlar { } içine yazılır. İki nokta (:) kullanılmaz.',
      },
      {
        h: 'else if ve else',
        b: '<p><code>else</code> \"değilse\" demektir. İkiden fazla seçenek varsa <code>else if</code> kullanırız. Python daki <code>elif</code> in karşılığı budur.</p><p>C# yukarıdan aşağı bakar, ilk doğru olanı çalıştırır ve gerisini atlar.</p>',
        code: 'int puan = 70;\nif (puan >= 90)\n{\n    Console.WriteLine("Pekiyi");\n}\nelse if (puan >= 50)\n{\n    Console.WriteLine("Geçtin");\n}\nelse\n{\n    Console.WriteLine("Tekrar dene");\n}',
        hard: 'elif yoktur, else if yazılır. İlk doğru koşul çalışır, gerisi atlanır.',
      },
      {
        h: 'Karşılaştırma ve mantık',
        b: '<p>Karşılaştırma işaretleri Python daki gibidir: <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>.</p><p>Mantık kelimelerinin yerine işaret kullanılır: <code>&amp;&amp;</code> (ve), <code>||</code> (veya), <code>!</code> (değil).</p>',
        code: 'Console.WriteLine(5 == 5);   // True\nConsole.WriteLine(5 != 3);   // True\nConsole.WriteLine(2 > 7);    // False\nint yas = 13;\nbool bilet = true;\nif (yas > 10 && bilet)\n{\n    Console.WriteLine("İçeri gir");\n}\nConsole.WriteLine(5 > 3 || 2 > 9);   // True\nConsole.WriteLine(!true);            // False',
        hard: 'and, or, not yazmak yok: &amp;&amp;, || ve ! kullanılır. Kodda true küçük yazılır ama ekrana True diye yazdırılır.',
      },
      {
        h: 'switch ile çoklu seçim',
        b: '<p>Çok seçenek olduğunda <code>switch</code> işini kolaylaştırır. Bir değere bakar ve tutan <code>case</code> i çalıştırır.</p><p>Her <code>case</code> <code>break;</code> ile biter. Hiçbiri tutmazsa <code>default</code> çalışır.</p>',
        code: 'int gun = 3;\nswitch (gun)\n{\n    case 1:\n        Console.WriteLine("Pazartesi");\n        break;\n    case 2:\n        Console.WriteLine("Salı");\n        break;\n    case 3:\n        Console.WriteLine("Çarşamba");\n        break;\n    default:\n        Console.WriteLine("Başka gün");\n        break;\n}',
        hard: 'Her case break; ile bitmelidir, unutursan hata verir. Hiçbir seçenek tutmazsa default çalışır.',
      },
    ],
    review: 'if koşulu parantez, satırlar süslü parantez içine yazılır. İkiden çok seçenek için else if kullanılır ve ilk doğru olan çalışır. == karşılaştırır, = atar. Mantık için &&, || ve ! kullanılır. switch çok seçenekli kararlar içindir, her case break ile biter ve default vardır.',
    ex: [
      [
        tf('== işareti iki değeri karşılaştırır.', true, '== \"eşit mi?\" sorusudur.'),
        mc('C# ta doğru yazılmış bir koşul hangisidir?', ['if x > 3:', 'if (x > 3)', 'if x > 3 then', 'if [x > 3]'], 1, 'Koşul parantez içine yazılır.'),
        ms('Hangi iki işaret mantık işaretidir?', ['&&', '=', '||', '->'], [0, 2], '&& ve || koşulları birleştirir.'),
        mc('int x = 10; iken: if (x > 20) A, else if (x > 5) B, else C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'x > 20 yanlış, x > 5 doğru. İlk doğru olan çalışır.'),
        mc('int x = 6; iken x > 3 && x < 5 sonucu nedir?', ['True', 'False', '6', 'hata'], 1, '&& için ikisi de doğru olmalı. x < 5 yanlış olduğu için sonuç False.'),
      ],
      [
        mc('Koşul yanlışsa hangi blok çalışır?', ['if', 'else', 'Console', 'switch'], 1, 'else yanlış durumu karşılar.'),
        tf('C# ta if koşulu Python gibi iki nokta ile biter.', false, 'C# ta parantez ve süslü parantez kullanılır.'),
        ms('Hangi iki bilgi doğrudur?', ['if koşulu parantez içine yazılır', 'Bloğun satırları { } içine alınır', 'if sonunda iki nokta konur', 'C# ta else if yerine elif yazılır'], [0, 1], 'C# ta ( ) ve { } kullanılır, elif yoktur.'),
        mc('Console.WriteLine(5 != 3); ne yazdırır?', ['True', 'False', '5', 'hata'], 0, '5 ile 3 farklıdır.'),
        tf('|| kullanırsan koşullardan biri doğru olduğunda sonuç True olur.', true, '|| için en az birinin doğru olması yeter.'),
      ],
      [
        mc('int x = 3; if (x == 3) { Console.WriteLine("A"); } ne yazdırır?', ['A', 'Hiçbir şey', 'hata', '3'], 0, 'x 3 e eşit, koşul doğru.'),
        mc('switch yapısında hiçbir case tutmazsa hangi bölüm çalışır?', ['default', 'else', 'otherwise', 'end'], 0, 'default hiçbir seçenek tutmazsa çalışır.'),
        ms('Hangi iki satır doğru yazılmıştır?', ['if (puan >= 50)', 'if puan >= 50:', 'else', 'else (puan < 50)'], [0, 2], 'if koşul ister. else koşul almaz.'),
        mc('int yas = 10; iken: yas >= 12 ise "Büyük", değilse "Küçük" yazdırılıyor. Çıktı ne olur?', ['Büyük', 'Küçük', '10', 'hata'], 1, '10 >= 12 yanlış, else çalışır.'),
        mc('int x = 2; iken Console.WriteLine(x == 2 || x == 9); ne yazdırır?', ['True', 'False', '2', 'hata'], 0, 'Birincisi doğru. || için bu yeter.'),
      ],
    ],
  },
  {
    id: 'cs3', t: 'C# 3: Döngüler',
    slides: [
      {
        h: 'for ile tekrar',
        b: '<p>C# ta <code>for</code> üç parçalı yazılır ve parçalar <code>;</code> ile ayrılır: <b>başlangıç</b>; <b>koşul</b>; <b>adım</b>.</p><p><code>for (int i = 0; i &lt; 3; i++)</code> şunu söyler: i 0 dan başlasın, i 3 ten küçük olduğu sürece dönsün, her turdan sonra i bir artsın. <code>i++</code> \"bir arttır\" demektir.</p>',
        code: 'for (int i = 0; i < 3; i++)\n{\n    Console.WriteLine($"Tur {i}");\n}\n// Tur 0\n// Tur 1\n// Tur 2',
        hard: 'i < 3 yazdığın için 3 dahil değildir. i <= 3 yazarsan 3 de dahil olur ve 4 tur döner.',
      },
      {
        h: 'Adım ve geri sayım',
        b: '<p>Adımı değiştirerek ikişer ikişer sayabilirsin: <code>j += 2</code>. Geri saymak için <code>k--</code> yazılır, bu değeri bir azaltır.</p><p>Koşuldaki işarete dikkat et: <code>&lt;</code> bitişi dahil etmez, <code>&lt;=</code> dahil eder.</p>',
        code: 'for (int i = 1; i <= 3; i++) { Console.WriteLine(i); }     // 1 2 3\nfor (int j = 0; j < 10; j += 2) { Console.WriteLine(j); }  // 0 2 4 6 8\nfor (int k = 3; k >= 1; k--) { Console.WriteLine(k); }     // 3 2 1',
        hard: 'j < 10 yazarsan 10 dahil değil, j <= 10 yazarsan dahildir. Bu işaret çok karıştırılır.',
      },
      {
        h: 'while ve toplama',
        b: '<p><code>while</code> koşul doğru olduğu sürece tekrar eder. Sayacı değiştirmezsen döngü hiç bitmez.</p><p>Toplama yaparken önce <code>int toplam = 0;</code> hazırlarız, her turda yeni sayıyı ekleriz.</p>',
        code: 'int x = 0;\nwhile (x < 3)\n{\n    Console.WriteLine(x);\n    x++;\n}\nint toplam = 0;\nfor (int i = 0; i <= 3; i++)\n{\n    toplam = toplam + i;\n}\nConsole.WriteLine(toplam);   // 0+1+2+3 = 6',
        hard: 'x++ unutulursa sonsuz döngü olur. int toplam = 0; satırı döngüden önce yazılır.',
      },
    ],
    review: 'for (başlangıç; koşul; adım) şeklinde yazılır. i < 3 bitişi almaz, i <= 3 alır. i++ bir arttırır, k-- bir azaltır, j += 2 ikişer arttırır. while koşul doğruyken tekrar eder ve sayaç değişmezse sonsuza gider. Toplam için int toplam = 0; döngüden önce yazılır.',
    ex: [
      [
        tf('for (int i = 0; i < 3; i++) döngüsü i yi 0, 1 ve 2 değerleriyle çalıştırır.', true, 'i < 3 olduğu için 3 dahil değildir.'),
        mc('for (int i = 0; i < 4; i++) { Console.WriteLine(i); } kaç satır yazdırır?', ['3', '4', '5', '1'], 1, 'i 0, 1, 2, 3 değerlerini alır: 4 satır.'),
        ms('Hangi ikisi bir döngü yapısıdır?', ['for', 'if', 'while', 'Console'], [0, 2], 'for ve while tekrar için kullanılır.'),
        mc('while döngüsünde sayaç hiç değişmezse ne olur?', ['Döngü sonsuza kadar sürer', 'Döngü hiç çalışmaz', 'Hata verir ve başlamaz', 'Bir kez çalışıp durur'], 0, 'Koşul hiç yanlış olmayacağı için döngü bitmez.'),
        tf('int toplam = 0; satırı döngüden önce yazılır.', true, 'Toplamın bir başlangıç değeri olmalıdır.'),
      ],
      [
        mc('for (int i = 1; i < 4; i++) hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], 0, 'Başlangıç dahil, i < 4 olduğu için 4 dahil değildir.'),
        tf('while döngüsü koşul yanlış olunca durur.', true, 'Koşul her turda kontrol edilir.'),
        ms('Hangi ikisi doğrudur?', ['for (int i = 0; i < 5; i++) beş tur döner', 'i < 5 yazarsan 5 de dahildir', 'for döngüsü tekrar için kullanılır', 'x++ yazmak x i 2 arttırır'], [0, 2], 'i < 5 ile 0, 1, 2, 3, 4 olur. x++ bir arttırır.'),
        mc('int toplam = 0; for (int i = 0; i <= 2; i++) { toplam = toplam + i; } çalışırsa toplam kaç olur?', ['3', '6', '0', '2'], 0, '0 + 1 + 2 = 3.'),
        mc('for (int i = 1; i <= 4; i++) hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '2, 3, 4', '0, 1, 2, 3'], 1, 'i <= 4 olduğu için 4 dahildir.'),
      ],
      [
        mc('for (int i = 0; i < 2; i++) { Console.WriteLine("Merhaba"); } kaç kez Merhaba yazdırır?', ['1', '2', '3', '0'], 1, 'i 0 ve 1 değerlerini alır: 2 tur.'),
        tf('i < 5 koşuluyla çalışan for döngüsünde i 5 değerini de alır.', false, 'i < 5 ise 5 dahil değildir.'),
        ms('Hangi iki bilgi doğrudur?', ['while koşul doğruyken tekrar eder', 'for döngüsünde i her turda yeni değer alır', 'while döngüsü hiç durmaz', 'i++ yazmak i yi 3 arttırır'], [0, 1], 'while durabilir, i++ bir arttırır.'),
        mc('int sayac = 0; while (sayac < 3) { sayac++; } kaç tur döner?', ['2', '3', '4', 'sonsuz'], 1, 'sayac 0, 1, 2 iken döner, 3 olunca durur.'),
        mc('for (int j = 0; j < 10; j += 2) hangi sayıları verir?', ['0, 2, 4, 6, 8', '2, 4, 6, 8, 10', '0, 2, 4, 6, 8, 10', '1, 3, 5, 7, 9'], 0, 'j < 10 olduğu için 10 dahil değildir.'),
      ],
    ],
  },
  {
    id: 'cs4', t: 'C# 4: Listeler',
    slides: [
      {
        h: 'Liste nedir?',
        b: '<p>Liste, birçok değeri tek kutuda tutar. C# ta <code>List&lt;string&gt;</code> gibi yazılır: köşeli ok içindeki tür, listenin içinde ne olacağını söyler. Dosyanın başına <code>using System.Collections.Generic;</code> yazman gerekebilir.</p><p>Eleman sayısını <code>Count</code> verir. Python daki <code>len()</code> in karşılığı budur.</p>',
        code: 'using System.Collections.Generic;\n\nList<string> meyveler = new List<string> { "elma", "armut", "kiraz" };\nConsole.WriteLine(meyveler.Count);   // 3',
        hard: 'Listenin türü List&lt;string&gt; gibi yazılır. Eleman sayısı için len() değil Count kullanılır.',
      },
      {
        h: 'Sıra numarası (indeks)',
        b: '<p>Sıra numarası burada da <b>0 dan</b> başlar. Bir elemana köşeli parantezle ulaşırız: <code>meyveler[0]</code>.</p><p>Son elemanın sıra numarası <code>Count - 1</code> dir.</p>',
        code: 'List<string> meyveler = new List<string> { "elma", "armut", "kiraz" };\nConsole.WriteLine(meyveler[0]);                    // elma\nConsole.WriteLine(meyveler[1]);                    // armut\nConsole.WriteLine(meyveler[meyveler.Count - 1]);   // kiraz',
        hard: 'Python daki [-1] C# ta çalışmaz, hata verir. Son eleman için Count - 1 kullan.',
      },
      {
        h: 'Ekleme, değiştirme, gezme',
        b: '<p><code>Add()</code> listenin sonuna eleman ekler. Bir elemanı değiştirmek için sıra numarasına yeni değer atarız.</p><p>Elemanları sırayla gezmek için <code>foreach</code> kullanılır. Her turda <code>m</code> listedeki bir sonraki eleman olur.</p>',
        code: 'List<string> meyveler = new List<string> { "elma", "armut" };\nmeyveler.Add("muz");        // sona ekler\nmeyveler[0] = "çilek";      // ilkini değiştirir\nforeach (string m in meyveler)\n{\n    Console.WriteLine(m);\n}\n// çilek\n// armut\n// muz',
        hard: 'Add büyük A ile yazılır. foreach (string m in meyveler) satırında m elemanın kendisidir, sıra numarası değil.',
      },
    ],
    review: 'Liste List<tür> ile yapılır, Count eleman sayısını verir. Sıra numarası 0 dan başlar, son elemanın numarası Count - 1 dir. Add() sona ekler, meyveler[0] = "x" ilk elemanı değiştirir. foreach ile elemanlar sırayla gezilir.',
    ex: [
      [
        tf('C# ta liste List<string> gibi bir türle oluşturulur.', true, 'Köşeli ok içindeki tür listenin elemanlarının türüdür.'),
        mc('List<int> sayilar = new List<int> { 10, 20, 30 }; ise sayilar[0] kaçtır?', ['10', '20', '30', '0'], 0, 'İlk elemanın sıra numarası 0 dır.'),
        ms('Hangi iki bilgi doğrudur?', ['Liste eleman sayısı Count ile bulunur', 'Listenin ilk elemanı [1] ile alınır', 'Add() listenin sonuna ekler', 'Listelerde uzunluk len() ile bulunur'], [0, 2], 'İlk eleman [0] dır, uzunluk için Count kullanılır.'),
        mc('new List<string> { "a", "b", "c", "d" }.Count ne verir?', ['3', '4', '5', 'hata'], 1, 'Listede 4 eleman var.'),
        tf('Listenin ilk elemanının sıra numarası 1 dir.', false, 'Sıra numarası 0 dan başlar.'),
      ],
      [
        mc('List<string> l = new List<string> { "a", "b", "c" }; ise l[2] nedir?', ['a', 'b', 'c', 'hata'], 2, 'l[0]=a, l[1]=b, l[2]=c.'),
        tf('Add() listenin sonuna eleman ekler.', true, 'Yeni eleman en sona eklenir.'),
        ms('Hangi iki bilgi doğrudur?', ['Liste birden fazla değer tutabilir', 'Sıra numarası 1 den başlar', 'Count listenin eleman sayısını verir', 'Add() listenin başına ekler'], [0, 2], 'Sıra numarası 0 dan başlar, Add() sona ekler.'),
        mc('List<int> x = new List<int> { 5, 6 }; x.Add(7); çalıştırırsan x.Count kaç olur?', ['2', '3', '4', '7'], 1, 'Liste 5, 6, 7 olur, 3 eleman var.'),
        tf('C# ta l[-1] listenin son elemanıdır.', false, 'C# ta negatif sıra numarası hata verir. Son eleman l[l.Count - 1] dir.'),
      ],
      [
        mc('List<int> s = new List<int> { 4, 8, 12 }; s[1] = 9; yazılırsa liste ne olur?', ['{ 4, 9, 12 }', '{ 9, 8, 12 }', '{ 4, 8, 9 }', '{ 4, 8, 12, 9 }'], 0, 'Sıra numarası 1 olan ikinci eleman değişir.'),
        tf('foreach (int x in liste) listenin her elemanını sırayla gezer.', true, 'x her turda bir sonraki eleman olur.'),
        ms('a bir List<int> ise hangi iki satır doğru yazılmıştır?', ['a.Add(3);', 'a[0] = 3;', 'a(3);', 'a.add 3;'], [0, 1], 'Add() sona ekler, a[0] = 3 ilk elemanı değiştirir.'),
        mc('foreach (string m in new List<string> { "a", "b" }) { Console.WriteLine(m); } kaç satır yazdırır?', ['1', '2', '3', '0'], 1, 'Listede 2 eleman var, 2 tur döner.'),
        tf('List<int> { 10, 20, 30 } listesinde 30 un sıra numarası 3 tür.', false, 'Sıra numarası 0 dan başladığı için 30 un numarası 2 dir.'),
      ],
    ],
  },
  {
    id: 'cs5', t: 'C# 5: Metotlar',
    slides: [
      {
        h: 'Metot nedir?',
        b: '<p>C# ta fonksiyonlara <b>metot</b> denir. İkisi aynı şeydir: bir kez yazıp istediğin kadar kullanabildiğin küçük bir makine.</p><p>Başlığın başına dönüş türü yazılır. Sonuç vermeyen metotlar için <code>void</code> yazılır. Metodu çalıştırmak için adını ve parantezi yazarız.</p>',
        code: 'static void Selam()\n{\n    Console.WriteLine("Merhaba!");\n    Console.WriteLine("Nasılsın?");\n}\n\nSelam();\nSelam();',
        hard: 'Metodu tanımlamak onu çalıştırmaz. Çalışması için Selam(); diye çağırmalısın.',
      },
      {
        h: 'Parametre ile bilgi ver',
        b: '<p>Metoda bilgi vermek için parantezin içine <b>parametre</b> yazarız. C# ta her parametrenin türü adının önüne yazılır: <code>string ad</code>.</p><p>Çağırırken ise sadece değeri yazarsın.</p>',
        code: 'static void Selam(string ad)\n{\n    Console.WriteLine($"Merhaba {ad}");\n}\n\nSelam("Ada");   // Merhaba Ada\nSelam("Can");   // Merhaba Can',
        hard: 'Parametrenin türünü yazmak zorundasın: string ad. Python da buna gerek yoktu.',
      },
      {
        h: 'Sonuç döndürme',
        b: '<p>Metodun sonuç vermesini istersen <code>return</code> kullanırsın. Metodun adının önüne <code>void</code> yerine sonucun türünü yazarız, örneğin <code>int</code>.</p><p>Dönen sonucu bir değişkene koyabilir ya da doğrudan yazdırabilirsin.</p>',
        code: 'static int Topla(int a, int b)\n{\n    return a + b;\n}\n\nint sonuc = Topla(3, 4);\nConsole.WriteLine(sonuc);          // 7\nConsole.WriteLine(Topla(1, 2));    // 3',
        hard: 'Adın önündeki int sonucun türünü söyler. void yazarsan return ile değer veremezsin.',
      },
    ],
    review: 'C# ta fonksiyona metot denir. Başlığa önce dönüş türü yazılır, sonuç yoksa void yazılır. Tanımlamak çalıştırmaz, adını parantezle yazarak çağırırız. Parametrenin türü adının önüne yazılır: string ad. return sonucu geri verir, Console.WriteLine ise sadece ekrana yazar.',
    ex: [
      [
        tf('C# ta metot static void Selam() gibi bir başlıkla tanımlanabilir.', true, 'void sonuç döndürmeyen metotlar içindir.'),
        mc('Tanımlanmış bir metodu çalıştırmak için ne yaparız?', ['Adını parantezle yazarız: Selam();', 'Sadece static yazarız', 'using yazarız', 'Hiçbir şey yapmayız'], 0, 'Metodu çağırmak için adının yanına parantez koyarız.'),
        ms('Hangi iki satır doğru bir metot başlığıdır?', ['static void Selam()', 'def Selam()', 'static int Topla(int a, int b)', 'static Topla(a, b)'], [0, 2], 'Başlıkta dönüş türü, ad, parantez ve parametre türleri bulunur.'),
        mc('static int F(int x) { return x * 2; } yazılırsa Console.WriteLine(F(5)); ne yazdırır?', ['5', '10', '25', 'hata'], 1, '5 * 2 = 10.'),
        tf('Metodu tanımlamak onu hemen çalıştırır.', false, 'Tanımlamak sadece hazırlar. Çalışması için çağırmak gerekir.'),
      ],
      [
        mc('static int Topla(int a, int b) { return a + b; } yazılırsa Topla(2, 3) sonucu nedir?', ['23', '5', '6', 'hata'], 1, '2 + 3 = 5.'),
        tf('Metoda bilgi vermek için parametre kullanılır.', true, 'Parametre metodun aldığı bilgidir.'),
        ms('Hangi iki bilgi doğrudur?', ['Metot bir kez yazılır, birçok kez çağrılır', 'Parametrenin türü yazılmaz', 'return sonucu geri verir', 'Metotta parametre olamaz'], [0, 2], 'C# ta parametrenin türü yazılır ve parametre kullanılabilir.'),
        mc('static int Kare(int n) { return n * n; } yazılırsa Kare(4) kaçtır?', ['8', '16', '44', 'hata'], 1, '4 * 4 = 16.'),
        tf('void, metodun sonuç döndürmediğini gösterir.', true, 'void sonuç yok demektir.'),
      ],
      [
        mc('static void Selam(string ad) { Console.WriteLine($"Merhaba {ad}"); } yazılırsa Selam("Ece"); ne yazdırır?', ['Merhaba ad', 'Merhaba Ece', 'Ece', 'hata'], 1, 'ad parametresi "Ece" değerini alır.'),
        tf('Aynı metot farklı değerlerle birden fazla kez çağrılabilir.', true, 'Metodun amacı budur.'),
        ms('Hangi iki satır bir metodu çağırır?', ['Topla(1, 2);', 'static int Topla(1, 2);', 'Selam();', 'static void Selam()'], [0, 2], 'static ile başlayan satır tanımlar, ad ve parantez ise çağırır.'),
        mc('Bir metot "A" yazdırıyor ve onu 2 kez çağırıyorsun. Kaç tane A görürsün?', ['0', '1', '2', '3'], 2, 'Her çağrıda bir kez çalışır.'),
        tf('return ile Console.WriteLine aynı işi yapar.', false, 'Console.WriteLine ekrana yazar, return değeri geri verir.'),
      ],
    ],
  },
]

export const CSF: Q[] = [
  mc('Hangisi string değeridir?', ['12', '"12"', '12.0', 'true'], 1, 'Çift tırnak içindeki değer string dir.'),
  mc('List<int> liste = new List<int> { 5, 10, 15 }; iken liste[1] kaçtır?', ['5', '10', '15', '1'], 1, 'Sıra numarası 0 dan başlar: liste[0]=5, liste[1]=10.'),
  ms('Hangi iki satır doğru bir değişken tanımıdır?', ['int sayi1 = 5;', '5 = int sayi1;', 'string ad = "Ece";', 'string "Ece" = ad;'], [0, 2], 'Önce tür, sonra ad gelir.'),
  mc('int x = 7; iken: if (x > 10) A, else if (x > 5) B, else C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'İlk doğru koşul çalışır.'),
  mc('static int Kare(int n) { return n * n; } tanımından sonra Kare(3) ne verir?', ['6', '9', '33', 'hata'], 1, '3 * 3 = 9.'),
  ms('Hangi ikisi karşılaştırma işaretidir?', ['==', '=', '>=', '<-'], [0, 2], '= atama yapar, karşılaştırmaz.'),
  mc('for (int i = 0; i < 3; i++) kaç tur döndürür?', ['2', '3', '4', '0'], 1, 'i 0, 1, 2 değerlerini alır: 3 tur.'),
  tf('while döngüsünde sayaç artmazsa döngü sonsuz olabilir.', true, 'Koşul hiç yanlış olmaz.'),
  mc('int toplam = 0; for (int i = 0; i <= 3; i++) { toplam = toplam + i; } çalışırsa toplam kaç olur?', ['4', '6', '10', '3'], 1, '0 + 1 + 2 + 3 = 6. i <= 3 olduğu için 3 dahildir.'),
  ms('Hangi iki bilgi doğrudur?', ['Console.WriteLine() ekrana yazar', 'C# ta komutların sonuna noktalı virgül konmaz', 'Add() listenin sonuna ekler', 'Console.ReadLine() sayı verir'], [0, 2], 'Komutlar ; ile biter, ReadLine() string verir.'),
]
