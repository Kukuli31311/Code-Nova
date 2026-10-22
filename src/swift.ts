import { tf, mc, ms } from './types'
import type { Q, Lesson } from './types'

export const SW: Lesson[] = [
  {
    id: 'sw1', t: 'Swift 1: Temeller',
    slides: [
      {
        h: 'Swift nedir?',
        b: '<p><b>Swift</b>, Apple in geliştirdiği modern bir programlama dilidir. iPhone, iPad ve Mac uygulamaları Swift ile yazılır.</p><p>Kod yine yukarıdan aşağıya sırayla çalışır. <code>print()</code> ekrana yazı yazdırır. Python gibi, satır sonuna noktalı virgül koymana gerek yoktur.</p>',
        code: 'print("Merhaba Dünya")\nprint("Ben Swift öğreniyorum")',
        hard: 'Satırların sırası önemlidir. Swift te satır sonuna ; koymak zorunda değilsin.',
      },
      {
        h: 'let ve var',
        b: '<p>Swift te değişken (kutu) yapmanın iki yolu vardır.</p><p><code>let</code> değişmeyen kutudur. İçine bir kez değer koyarsın, sonra değiştiremezsin. <code>var</code> ise değişebilen kutudur.</p><p>Değişmesi gerekmiyorsa <code>let</code>, değişecekse <code>var</code> kullan.</p>',
        code: 'let ad = "Ada"\nvar yas = 12\nyas = 13\nprint(yas)       // 13\n// ad = "Can"   // HATA: let değişmez',
        hard: 'let ile yaptığın kutuya sonradan yeni değer koyamazsın. Değişecekse var yaz.',
      },
      {
        h: 'Veri türleri',
        b: '<p>Swift te dört önemli tür vardır: <code>Int</code> tam sayı, <code>Double</code> ondalıklı sayı, <code>String</code> yazı, <code>Bool</code> doğru/yanlış.</p><p>Türü kendisi bulabilir, istersen iki nokta ile kendin yazabilirsin: <code>let sayi: Int = 12</code>.</p><p>Yazılar çift tırnak içine alınır. <code>true</code> ve <code>false</code> küçük harfle yazılır.</p>',
        code: 'let sayi: Int = 12\nlet ondalik = 3.5       // Double\nlet ad = "Ada"          // String\nlet varMi = true        // Bool\nprint("12" + "3")       // 123',
        hard: 'Tür adı Bool dur, Boolean değil. Swift Int ile Double ı doğrudan toplamaz: Double(sayi) + ondalik yazmalısın.',
      },
      {
        h: 'Hesap yapma ve yazı içine değer',
        b: '<p>İşaretler Python daki gibidir: <code>+</code> <code>-</code> <code>*</code> <code>/</code> ve kalan için <code>%</code>.</p><p>Bir yazının içine değişken koymak için <code>\\(değişken)</code> yazılır. Ters bölü, parantez ve değişken adı birlikte kullanılır.</p>',
        code: 'print(7 / 2)      // 3\nprint(7.0 / 2)    // 3.5\nprint(7 % 2)      // 1\nlet ad = "Ada"\nprint("Merhaba \\(ad)")   // Merhaba Ada',
        hard: 'İki tam sayıyı bölersen sonuç da tam sayı olur: 7 / 2 sonucu 3 tür, 3.5 değil.',
      },
      {
        h: 'readLine ile soru sorma',
        b: '<p><code>readLine()</code> kullanıcının yazdığı cevabı alır. Ama bazen cevap hiç gelmeyebilir, bu yüzden sonuç \"olabilir de olmayabilir de\" bir değerdir. Buna <b>Optional</b> denir.</p><p><code>??</code> işareti \"boşsa şunu kullan\" demektir. Sayıya çevirmek için <code>Int( )</code> kullanılır, bu da boş dönebilir.</p>',
        code: 'let ad = readLine() ?? ""\nprint("Merhaba \\(ad)")\nlet yas = Int(readLine() ?? "") ?? 0\nprint("Seneye \\(yas + 1)")',
        hard: 'readLine() ve Int() boş (nil) dönebilir. ?? ile boş kalırsa kullanılacak yedek değeri yazarız.',
      },
    ],
    review: 'Swift kodu sırayla çalışır, noktalı virgül gerekmez. let değişmez, var değişebilir kutudur. Türler: Int, Double, String, Bool. Tam sayıların bölümü tam sayı çıkar. Yazı içine \\(değişken) ile değer konur. readLine() boş dönebilir, ?? ile yedek değer verilir.',
    ex: [
      [
        tf('Swift te let ile oluşturulan değişkenin değeri sonradan değiştirilemez.', true, 'let değişmez, var değişebilir.'),
        mc('Hangisi bir String değeridir?', ['7', '3.5', '"merhaba"', 'true'], 2, 'Çift tırnak içindeki değer String dir.'),
        ms('Hangi iki satır doğru bir tanımdır?', ['var puan = 90', 'puan var = 90', 'let ad = "Can"', 'let = ad "Can"'], [0, 2], 'Önce let ya da var, sonra ad, sonra = ve değer yazılır.'),
        mc('print(7 / 2) ne yazdırır?', ['3.5', '3', '4', '2'], 1, 'İki Int bölününce sonuç da Int olur: 3.'),
        mc('print(10 % 3) ne yazdırır?', ['1', '3', '0', '3.33'], 0, '% kalanı verir. 10 = 3 x 3 + 1, kalan 1 dir.'),
      ],
      [
        mc('Swift te ekrana yazdıran fonksiyon hangisidir?', ['print()', 'println()', 'show()', 'say()'], 0, 'Swift te print() kullanılır.'),
        tf('3.5 değeri Int türündedir.', false, 'Ondalıklı sayılar Double türündedir.'),
        ms('Hangi iki değer sayıdır?', ['10', '"10"', '2.5', '"2.5"'], [0, 2], 'Tırnaksız değerler sayıdır.'),
        mc('var a = 4 yazıp sonra a = 9 yazarsan a kaç olur?', ['4', '9', '13', 'hata'], 1, 'Yeni değer eskisinin yerine geçer.'),
        mc('Swift te doğru/yanlış türünün adı nedir?', ['Boolean', 'Bool', 'Bit', 'Truth'], 1, 'Swift te tür adı Bool dur.'),
      ],
      [
        mc('Hangisi bir Double sayıdır?', ['8', '"8.5"', '8.5', 'false'], 2, 'Tırnaksız ve noktalı sayı Double dır.'),
        tf('"Ada" bir String değeridir.', true, 'Tırnak içinde olduğu için String dir.'),
        ms('Hangi iki tanım doğrudur?', ['let sayi = 3', '3 = let sayi', 'var isim = "Can"', '"Can" = var isim'], [0, 2], 'Tanımda önce let ya da var, sonra ad gelir.'),
        mc('let ad = "Ece" yazıp print("Merhaba \\(ad)") dersen ne görürsün?', ['Merhaba \\(ad)', 'Merhaba Ece', 'Merhaba "Ece"', 'hata'], 1, '\\(ad) yerine değişkenin değeri yazılır.'),
        mc('print(3 * 4) ne yazdırır?', ['34', '12', '7', 'hata'], 1, '* çarpma yapar. 3 x 4 = 12.'),
      ],
    ],
  },
  {
    id: 'sw2', t: 'Swift 2: Koşullar',
    slides: [
      {
        h: 'if ile karar ver',
        b: '<p><code>if</code> \"eğer\" demektir. Koşul doğruysa süslü parantez içindeki satırlar çalışır.</p><p>Swift te koşulun etrafına parantez koymana gerek yoktur ama süslü parantez <code>{ }</code> <b>şarttır</b>, tek satır olsa bile.</p>',
        code: 'let yas = 13\nif yas >= 12 {\n    print("Ortaokul öğrencisisin")\n}\nprint("Bu satır her zaman çalışır")',
        hard: 'Satırlar { } içine yazılır. Python daki iki nokta (:) burada kullanılmaz.',
      },
      {
        h: 'else if ve else',
        b: '<p><code>else</code> \"değilse\" demektir. İkiden fazla seçenek varsa <code>else if</code> kullanılır. Python daki <code>elif</code> in karşılığı budur.</p><p>Swift yukarıdan aşağı bakar, ilk doğru olanı çalıştırır ve gerisini atlar.</p>',
        code: 'let puan = 70\nif puan >= 90 {\n    print("Pekiyi")\n} else if puan >= 50 {\n    print("Geçtin")\n} else {\n    print("Tekrar dene")\n}',
        hard: 'elif yoktur, else if yazılır. İlk doğru koşul çalışır, gerisi atlanır.',
      },
      {
        h: 'Karşılaştırma ve mantık',
        b: '<p>Karşılaştırma işaretleri Python daki gibidir: <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>.</p><p>Mantık kelimelerinin yerine işaret kullanılır: <code>&amp;&amp;</code> (ve), <code>||</code> (veya), <code>!</code> (değil).</p>',
        code: 'print(5 == 5)   // true\nprint(5 != 3)   // true\nprint(2 > 7)    // false\nlet yas = 13\nlet bilet = true\nif yas > 10 && bilet {\n    print("İçeri gir")\n}\nprint(5 > 3 || 2 > 9)   // true\nprint(!true)            // false',
        hard: 'and, or, not yazmak yok: &amp;&amp;, || ve ! kullanılır. true ve false küçük harfle yazılır.',
      },
      {
        h: 'switch ile çoklu seçim',
        b: '<p>Çok seçenek olduğunda <code>switch</code> işini kolaylaştırır. Bir değere bakar ve tutan <code>case</code> i çalıştırır.</p><p>Swift her olasılığı karşılamak ister, bu yüzden en sonda <code>default</code> yazılır. Hiçbiri tutmazsa o çalışır.</p>',
        code: 'let gun = 3\nswitch gun {\ncase 1:\n    print("Pazartesi")\ncase 2:\n    print("Salı")\ncase 3:\n    print("Çarşamba")\ndefault:\n    print("Başka gün")\n}',
        hard: 'default şarttır. Her case kendi başına biter, break yazmana gerek yoktur.',
      },
    ],
    review: 'if koşulu parantezsiz yazılabilir ama satırlar süslü parantez içinde olmalıdır. İkiden çok seçenek için else if kullanılır ve ilk doğru olan çalışır. == karşılaştırır, = atar. Mantık için &&, || ve ! kullanılır. switch çok seçenekli kararlar içindir ve default ister.',
    ex: [
      [
        tf('== işareti iki değeri karşılaştırır.', true, '== \"eşit mi?\" sorusudur.'),
        mc('Swift te doğru yazılmış bir koşul hangisidir?', ['if x > 3:', 'if x > 3 {', 'if x > 3 then', 'if [x > 3]'], 1, 'Koşul yazılır, satırlar süslü parantez içine alınır.'),
        ms('Hangi iki işaret mantık işaretidir?', ['&&', '=', '||', '->'], [0, 2], '&& ve || koşulları birleştirir.'),
        mc('let x = 10 iken: if x > 20 ise A, else if x > 5 ise B, else C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'x > 20 yanlış, x > 5 doğru. İlk doğru olan çalışır.'),
        mc('let x = 6 iken x > 3 && x < 5 sonucu nedir?', ['true', 'false', '6', 'hata'], 1, '&& için ikisi de doğru olmalı. x < 5 yanlış olduğu için sonuç false.'),
      ],
      [
        mc('Koşul yanlışsa hangi blok çalışır?', ['if', 'else', 'print', 'func'], 1, 'else yanlış durumu karşılar.'),
        tf('Swift te if bloğundaki süslü parantezler zorunludur.', true, 'Tek satır olsa bile { } yazılır.'),
        ms('Hangi iki bilgi doğrudur?', ['if koşulunun etrafına parantez koymak zorunlu değildir', 'Bloğun satırları { } içine alınır', 'if sonunda iki nokta konur', 'Swift te else if yerine elif yazılır'], [0, 1], 'Swift te parantez isteğe bağlı, { } zorunludur. elif yoktur.'),
        mc('5 != 3 sonucu nedir?', ['true', 'false', '5', 'hata'], 0, '5 ile 3 farklıdır.'),
        tf('|| kullanırsan koşullardan biri doğru olduğunda sonuç true olur.', true, '|| için en az birinin doğru olması yeter.'),
      ],
      [
        mc('let x = 3 iken if x == 3 { print("A") } ne yazdırır?', ['A', 'Hiçbir şey', 'hata', '3'], 0, 'x 3 e eşit, koşul doğru.'),
        mc('switch yapısında hiçbir case tutmazsa hangi bölüm çalışır?', ['default', 'else', 'otherwise', 'end'], 0, 'default hiçbir seçenek tutmazsa çalışır.'),
        ms('Hangi iki satır doğru yazılmıştır?', ['if puan >= 50 {', 'if puan >= 50:', '} else {', 'else puan < 50 {'], [0, 2], 'if koşul ve { ister. else koşul almaz.'),
        mc('let yas = 10 iken: yas >= 12 ise "Büyük", değilse "Küçük" yazdırılıyor. Çıktı ne olur?', ['Büyük', 'Küçük', '10', 'hata'], 1, '10 >= 12 yanlış, else çalışır.'),
        mc('let x = 2 iken x == 2 || x == 9 sonucu nedir?', ['true', 'false', '2', 'hata'], 0, 'Birincisi doğru. || için bu yeter.'),
      ],
    ],
  },
  {
    id: 'sw3', t: 'Swift 3: Döngüler',
    slides: [
      {
        h: 'for ile tekrar',
        b: '<p><code>for i in 0..&lt;3</code> altındaki satırları 3 kez çalıştırır. i önce 0, sonra 1, sonra 2 olur.</p><p><code>..&lt;</code> işareti \"bitişe kadar ama bitiş dahil değil\" demektir. Python daki <code>range(3)</code> ile aynıdır.</p>',
        code: 'for i in 0..<3 {\n    print("Tur \\(i)")\n}\n// Tur 0\n// Tur 1\n// Tur 2',
        hard: '..< bitişi almaz, ... ise alır. 0...3 yazarsan 3 de dahildir ve 4 tur döner.',
      },
      {
        h: '..., stride ve reversed',
        b: '<p><code>1...3</code> bitişi de dahil eder: 1, 2, 3.</p><p>Adımla saymak için <code>stride(from:to:by:)</code> kullanılır. Geriye saymak için aralığın sonuna <code>.reversed()</code> eklenir.</p>',
        code: 'for i in 1...3 { print(i) }                  // 1 2 3\nfor j in stride(from: 0, to: 10, by: 2) {\n    print(j)                                 // 0 2 4 6 8\n}\nfor k in (1...3).reversed() { print(k) }     // 3 2 1',
        hard: 'stride te to: 10 yazsan da 10 dahil olmaz. Sayma 8 de biter.',
      },
      {
        h: 'while ve toplama',
        b: '<p><code>while</code> koşul doğru olduğu sürece tekrar eder. Sayacı değiştirmezsen döngü hiç bitmez.</p><p>Swift te bir arttırmak için <code>x += 1</code> yazılır. Toplama yaparken önce <code>var toplam = 0</code> hazırlarız.</p>',
        code: 'var x = 0\nwhile x < 3 {\n    print(x)\n    x += 1\n}\nvar toplam = 0\nfor i in 0...3 {\n    toplam += i\n}\nprint(toplam)   // 0+1+2+3 = 6',
        hard: 'Swift te x++ yoktur, x += 1 yazılır. Sayaç arttırılmazsa döngü sonsuz olur.',
      },
    ],
    review: 'for i in 0..<3 bitişi almaz, 0...3 bitişi alır. stride adımla sayar, reversed() geriye sayar. while koşul doğruyken tekrar eder ve sayaç değişmezse sonsuza gider. Bir arttırmak için x += 1 yazılır. Toplam için var toplam = 0 döngüden önce yazılır.',
    ex: [
      [
        tf('0..<3 değerleri 0, 1 ve 2 dir.', true, '..< ile bitiş dahil değildir.'),
        mc('for i in 0..<4 { print(i) } kaç satır yazdırır?', ['3', '4', '5', '1'], 1, '0..<4 dört sayı verir: 0, 1, 2, 3.'),
        ms('Hangi ikisi bir döngü yapısıdır?', ['for', 'if', 'while', 'print'], [0, 2], 'for ve while tekrar için kullanılır.'),
        mc('while döngüsünde sayaç hiç değişmezse ne olur?', ['Döngü sonsuza kadar sürer', 'Döngü hiç çalışmaz', 'Hata verir ve başlamaz', 'Bir kez çalışıp durur'], 0, 'Koşul hiç yanlış olmayacağı için döngü bitmez.'),
        tf('var toplam = 0 satırı döngüden önce yazılır.', true, 'Toplamın bir başlangıç değeri olmalıdır.'),
      ],
      [
        mc('1..<4 hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], 0, 'Başlangıç dahil, bitiş dahil değildir.'),
        tf('while döngüsü koşul yanlış olunca durur.', true, 'Koşul her turda kontrol edilir.'),
        ms('Hangi ikisi doğrudur?', ['0..<5 beş sayı üretir', '0..<5 içinde 5 de vardır', 'for döngüsü tekrar için kullanılır', 'Swift te x++ ile arttırılır'], [0, 2], '0..<5: 0, 1, 2, 3, 4. Swift te x++ yoktur.'),
        mc('var toplam = 0 iken for i in 0...2 { toplam += i } çalışırsa toplam kaç olur?', ['3', '6', '0', '2'], 0, '0 + 1 + 2 = 3.'),
        mc('1...4 hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '2, 3, 4', '0, 1, 2, 3'], 1, '... ile bitiş dahildir.'),
      ],
      [
        mc('for i in 0..<2 { print("Merhaba") } kaç kez Merhaba yazdırır?', ['1', '2', '3', '0'], 1, '0..<2 iki tur döner.'),
        tf('0..<5 içinde 5 sayısı da bulunur.', false, '..< bitişi almaz: 0, 1, 2, 3, 4.'),
        ms('Hangi iki bilgi doğrudur?', ['while koşul doğruyken tekrar eder', 'for döngüsünde i her turda yeni değer alır', 'while döngüsü hiç durmaz', '0...3 sayıları 0, 1, 2 verir'], [0, 1], 'while durabilir, 0...3 ise 3 dahil dört sayı verir.'),
        mc('var sayac = 0 iken while sayac < 3 { sayac += 1 } kaç tur döner?', ['2', '3', '4', 'sonsuz'], 1, 'sayac 0, 1, 2 iken döner, 3 olunca durur.'),
        mc('stride(from: 0, to: 10, by: 2) hangi sayıları verir?', ['0, 2, 4, 6, 8', '2, 4, 6, 8, 10', '0, 2, 4, 6, 8, 10', '1, 3, 5, 7, 9'], 0, 'to bitişi almaz, bu yüzden 10 yoktur.'),
      ],
    ],
  },
  {
    id: 'sw4', t: 'Swift 4: Diziler',
    slides: [
      {
        h: 'Dizi nedir?',
        b: '<p>Swift te Python daki listenin karşılığına <b>dizi</b> (array) denir. Köşeli parantez ile yazılır ve elemanlar virgülle ayrılır.</p><p>Eleman sayısını <code>count</code> verir. Python daki <code>len()</code> in karşılığı budur.</p>',
        code: 'let meyveler = ["elma", "armut", "kiraz"]\nprint(meyveler)         // ["elma", "armut", "kiraz"]\nprint(meyveler.count)   // 3',
        hard: 'Eleman sayısı için len() ya da size değil, count yazılır.',
      },
      {
        h: 'Sıra numarası (indeks)',
        b: '<p>Sıra numarası burada da <b>0 dan</b> başlar. Bir elemana köşeli parantezle ulaşırız: <code>meyveler[0]</code>.</p><p>Son elemanın sıra numarası <code>count - 1</code> dir.</p>',
        code: 'let meyveler = ["elma", "armut", "kiraz"]\nprint(meyveler[0])                     // elma\nprint(meyveler[1])                     // armut\nprint(meyveler[meyveler.count - 1])    // kiraz',
        hard: 'Python daki [-1] Swift te çalışmaz. Olmayan bir sıra numarası istersen program çöker.',
      },
      {
        h: 'Değiştirilebilir dizi',
        b: '<p>Diziyi <code>let</code> ile yaparsan <b>değiştirilemez</b>. Eleman eklemek ya da değiştirmek istiyorsan <code>var</code> ile yapmalısın.</p><p><code>append()</code> sona ekler. Elemanları sırayla gezmek için <code>for m in dizi</code> yazılır.</p>',
        code: 'var meyveler = ["elma", "armut"]\nmeyveler.append("muz")      // sona ekler\nmeyveler[0] = "çilek"       // ilkini değiştirir\nfor m in meyveler {\n    print(m)\n}\n// çilek\n// armut\n// muz',
        hard: 'let ile yaptığın diziye append() yazamazsın. Değişecek dizi var ile oluşturulur.',
      },
    ],
    review: 'Dizi köşeli parantezle yazılır, count eleman sayısını verir. Sıra numarası 0 dan başlar, son elemanın numarası count - 1 dir. let ile yapılan dizi değişmez, var ile yapılana append() ve atama yapılabilir. for m in dizi ile elemanlar sırayla gezilir.',
    ex: [
      [
        tf('Swift te diziler köşeli parantezle yazılır.', true, 'Örnek: [1, 2, 3].'),
        mc('let sayilar = [10, 20, 30] ise sayilar[0] kaçtır?', ['10', '20', '30', '0'], 0, 'İlk elemanın sıra numarası 0 dır.'),
        ms('Hangi iki satır doğru bir dizidir?', ['[1, 2, 3]', '1, 2, 3]', '["a", "b"]', '[1 2 3]'], [0, 2], 'Dizi köşeli parantez içindedir ve elemanlar virgülle ayrılır.'),
        mc('["a", "b", "c", "d"].count ne verir?', ['3', '4', '5', 'hata'], 1, 'Dizide 4 eleman var.'),
        tf('Dizinin ilk elemanının sıra numarası 1 dir.', false, 'Sıra numarası 0 dan başlar.'),
      ],
      [
        mc('let l = ["a", "b", "c"] ise l[2] nedir?', ['a', 'b', 'c', 'hata'], 2, 'l[0]=a, l[1]=b, l[2]=c.'),
        tf('append() var ile yapılmış dizinin sonuna eleman ekler.', true, 'Yeni eleman en sona eklenir.'),
        ms('Hangi iki bilgi doğrudur?', ['Dizi birden fazla değer tutabilir', 'Sıra numarası 1 den başlar', 'count dizinin eleman sayısını verir', 'append() dizinin başına ekler'], [0, 2], 'Sıra numarası 0 dan başlar, append() sona ekler.'),
        mc('var x = [5, 6] yazıp x.append(7) çalıştırırsan x.count kaç olur?', ['2', '3', '4', '7'], 1, 'Dizi [5, 6, 7] olur, 3 eleman var.'),
        tf('Swift te l[-1] dizinin son elemanıdır.', false, 'Swift te negatif sıra numarası çalışmaz, program çöker.'),
      ],
      [
        mc('var s = [4, 8, 12] iken s[1] = 9 yazılırsa dizi ne olur?', ['[4, 9, 12]', '[9, 8, 12]', '[4, 8, 9]', '[4, 8, 12, 9]'], 0, 'Sıra numarası 1 olan ikinci eleman değişir.'),
        tf('for x in dizi dizinin her elemanını sırayla gezer.', true, 'x her turda bir sonraki eleman olur.'),
        ms('a var ile oluşturulmuş bir dizi ise hangi iki satır doğru yazılmıştır?', ['a.append(3)', 'a[0] = 3', 'a(3)', 'a.add 3'], [0, 1], 'append() sona ekler, a[0] = 3 ilk elemanı değiştirir.'),
        mc('for m in ["a", "b"] { print(m) } kaç satır yazdırır?', ['1', '2', '3', '0'], 1, 'Dizide 2 eleman var, 2 tur döner.'),
        tf('[10, 20, 30] dizisinde 30 un sıra numarası 3 tür.', false, 'Sıra numarası 0 dan başladığı için 30 un numarası 2 dir.'),
      ],
    ],
  },
  {
    id: 'sw5', t: 'Swift 5: Fonksiyonlar',
    slides: [
      {
        h: 'Fonksiyon nedir?',
        b: '<p>Fonksiyon, bir kez yazıp istediğin kadar kullanabildiğin küçük bir makinedir. Swift te <code>func</code> ile tanımlanır. Aslında <code>print()</code> de bir fonksiyondur.</p><p>Fonksiyonu çalıştırmak için adını ve parantezi yazarız. Buna <b>çağırmak</b> denir.</p>',
        code: 'func selam() {\n    print("Merhaba!")\n    print("Nasılsın?")\n}\n\nselam()\nselam()',
        hard: 'func sadece fonksiyonu hazırlar. Çalışması için selam() diye çağırmalısın.',
      },
      {
        h: 'Parametre ve etiket',
        b: '<p>Fonksiyona bilgi vermek için parantezin içine <b>parametre</b> yazarız. Swift te türü iki noktadan sonra yazarız: <code>ad: String</code>.</p><p>Swift e özel bir kural var: çağırırken parametrenin <b>adını da</b> yazarsın. Buna etiket denir.</p>',
        code: 'func selam(ad: String) {\n    print("Merhaba \\(ad)")\n}\n\nselam(ad: "Ada")   // Merhaba Ada\nselam(ad: "Can")   // Merhaba Can',
        hard: 'Çağırırken selam(ad: "Ada") yazılır. Sadece selam("Ada") yazarsan hata verir.',
      },
      {
        h: 'Sonuç döndürme',
        b: '<p>Fonksiyonun sonuç vermesini istersen <code>return</code> kullanırsın. Sonucun türü parantezden sonra <code>-&gt;</code> ile yazılır.</p><p>Çağırırken etiketi yazmak istemiyorsan parametrenin önüne <code>_</code> koyarsın.</p>',
        code: 'func topla(_ a: Int, _ b: Int) -> Int {\n    return a + b\n}\n\nprint(topla(3, 4))   // 7\nprint(topla(1, 2))   // 3',
        hard: 'Sonucun türü -&gt; Int gibi yazılır. Parametrenin önündeki _ \"çağırırken adı yazma\" demektir.',
      },
    ],
    review: 'Fonksiyon func ile tanımlanır. Tanımlamak çalıştırmaz, adını parantezle yazarak çağırırız. Parametrenin türü yazılır: ad: String. Çağırırken etiket yazılır: selam(ad: "Ada"), _ varsa yazılmaz. return sonucu geri verir ve sonucun türü -> Int gibi yazılır.',
    ex: [
      [
        tf('Swift te fonksiyon func kelimesiyle tanımlanır.', true, 'func, function yani fonksiyon demektir.'),
        mc('Tanımlanmış bir fonksiyonu çalıştırmak için ne yaparız?', ['Adını parantezle yazarız: selam()', 'Sadece func yazarız', 'import yazarız', 'Hiçbir şey yapmayız'], 0, 'Fonksiyonu çağırmak için adının yanına parantez koyarız.'),
        ms('Hangi iki satır doğru bir fonksiyon başlığıdır?', ['func selam() {', 'def selam() {', 'func topla(_ a: Int, _ b: Int) -> Int {', 'func topla(a, b) {'], [0, 2], 'func, ad, parantez ve türler gerekir.'),
        mc('func f(_ x: Int) -> Int { return x * 2 } yazılırsa print(f(5)) ne yazdırır?', ['5', '10', '25', 'hata'], 1, '5 * 2 = 10.'),
        tf('func yazmak fonksiyonu hemen çalıştırır.', false, 'func sadece tanımlar. Çalışması için çağırmak gerekir.'),
      ],
      [
        mc('func topla(_ a: Int, _ b: Int) -> Int { return a + b } yazılırsa topla(2, 3) sonucu nedir?', ['23', '5', '6', 'hata'], 1, '2 + 3 = 5.'),
        tf('Fonksiyona bilgi vermek için parametre kullanılır.', true, 'Parametre fonksiyonun aldığı bilgidir.'),
        ms('Hangi iki bilgi doğrudur?', ['Fonksiyon bir kez yazılır, birçok kez çağrılır', 'Parametrenin türü yazılmaz', 'return sonucu geri verir', 'Fonksiyonda parametre olamaz'], [0, 2], 'Swift te parametrenin türü yazılır ve parametre kullanılabilir.'),
        mc('func kare(_ n: Int) -> Int { return n * n } yazılırsa kare(4) kaçtır?', ['8', '16', '44', 'hata'], 1, '4 * 4 = 16.'),
        tf('-> Int ifadesi fonksiyonun Int türünde sonuç döndürdüğünü gösterir.', true, 'Okun yanındaki tür, sonucun türüdür.'),
      ],
      [
        mc('func selam(ad: String) { print("Merhaba \\(ad)") } yazılırsa selam(ad: "Ece") ne yazdırır?', ['Merhaba ad', 'Merhaba Ece', 'Ece', 'hata'], 1, 'ad parametresi "Ece" değerini alır.'),
        tf('Aynı fonksiyon farklı değerlerle birden fazla kez çağrılabilir.', true, 'Fonksiyonun amacı budur.'),
        ms('Hangi iki satır bir fonksiyonu çağırır?', ['topla(1, 2)', 'func topla(1, 2)', 'selam()', 'func selam() {'], [0, 2], 'func tanımlar, ad ve parantez ise çağırır.'),
        mc('Bir fonksiyon "A" yazdırıyor ve onu 2 kez çağırıyorsun. Kaç tane A görürsün?', ['0', '1', '2', '3'], 2, 'Her çağrıda bir kez çalışır.'),
        tf('func selam(ad: String) şeklinde tanımlanan fonksiyon selam(ad: "Ada") diye çağrılır.', true, 'Swift te çağırırken parametre etiketi yazılır.'),
      ],
    ],
  },
]

export const SWF: Q[] = [
  mc('Hangisi String değeridir?', ['12', '"12"', '12.0', 'true'], 1, 'Çift tırnak içindeki değer String dir.'),
  mc('let dizi = [5, 10, 15] iken dizi[1] kaçtır?', ['5', '10', '15', '1'], 1, 'Sıra numarası 0 dan başlar: dizi[0]=5, dizi[1]=10.'),
  ms('Hangi iki satır doğru bir tanımdır?', ['let sayi1 = 5', '5 = let sayi1', 'var ad = "Ece"', 'var "Ece" = ad'], [0, 2], 'Önce let ya da var, sonra ad gelir.'),
  mc('let x = 7 iken: if x > 10 ise A, else if x > 5 ise B, değilse C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'İlk doğru koşul çalışır.'),
  mc('func kare(_ n: Int) -> Int { return n * n } tanımından sonra kare(3) ne verir?', ['6', '9', '33', 'hata'], 1, '3 * 3 = 9.'),
  ms('Hangi ikisi karşılaştırma işaretidir?', ['==', '=', '>=', '<-'], [0, 2], '= atama yapar, karşılaştırmaz.'),
  mc('0..<3 kaç tur döndürür?', ['2', '3', '4', '0'], 1, '0, 1, 2 olmak üzere 3 tur.'),
  tf('while döngüsünde sayaç artmazsa döngü sonsuz olabilir.', true, 'Koşul hiç yanlış olmaz.'),
  mc('var toplam = 0 iken for i in 0...3 { toplam += i } çalışırsa toplam kaç olur?', ['4', '6', '10', '3'], 1, '0 + 1 + 2 + 3 = 6. 0...3 de 3 dahildir.'),
  ms('Hangi iki bilgi doğrudur?', ['print() ekrana yazar', 'let ile tanımlanan değişken sonradan değişir', 'append() var ile yapılan dizinin sonuna ekler', 'readLine() Int verir'], [0, 2], 'let değişmez, readLine() yazı verir.'),
]
