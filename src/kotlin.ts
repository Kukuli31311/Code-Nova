import { tf, mc, ms } from './types'
import type { Q, Lesson } from './types'

export const KT: Lesson[] = [
  {
    id: 'kt1', t: 'Kotlin 1: Temeller',
    slides: [
      {
        h: 'Kotlin nedir?',
        b: '<p><b>Kotlin</b>, modern ve kısa yazılan bir programlama dilidir. Android telefon uygulamalarının çoğu Kotlin ile yazılır.</p><p>Python da öğrendiğin fikirler burada da geçerli: kod yukarıdan aşağıya sırayla çalışır. Ama Kotlin girinti yerine <b>süslü parantez</b> <code>{ }</code> kullanır.</p><p>Programı <code>fun main()</code> başlatır. <code>println()</code> ekrana yazı yazdırır ve alt satıra geçer.</p>',
        code: 'fun main() {\n    println("Merhaba Dünya")\n    println("Ben Kotlin öğreniyorum")\n}',
        hard: 'Süslü parantezi açıp kapatmayı unutma. Python da girinti yeterdi, Kotlin de { } gerekir.',
      },
      {
        h: 'val ve var',
        b: '<p>Kotlin de değişken (kutu) yapmanın iki yolu vardır.</p><p><code>val</code> değişmeyen kutudur. İçine bir kez değer koyarsın, sonra değiştiremezsin. <code>var</code> ise değişebilen kutudur.</p><p>İyi bir kural: değişmesi gerekmiyorsa <code>val</code>, değişecekse <code>var</code> kullan.</p>',
        code: 'val ad = "Ada"\nvar yas = 12\nyas = 13\nprintln(yas)     // 13\n// ad = "Can"   // HATA: val değişmez',
        hard: 'val ile yaptığın kutuya sonradan yeni değer koyamazsın. Değişecekse var yaz.',
      },
      {
        h: 'Veri türleri',
        b: '<p>Kotlin de dört önemli tür vardır: <code>Int</code> tam sayı, <code>Double</code> ondalıklı sayı, <code>String</code> yazı, <code>Boolean</code> doğru/yanlış.</p><p>Türü kendisi bulabilir, istersen iki nokta ile kendin de yazabilirsin: <code>val sayi: Int = 12</code>.</p><p>Yazılar çift tırnak içine alınır. Doğru ve yanlış değerleri küçük harfle <code>true</code> ve <code>false</code> yazılır.</p>',
        code: 'val sayi: Int = 12\nval ondalik = 3.5      // Double\nval ad = "Ada"         // String\nval varMi = true       // Boolean\nprintln("12" + "3")    // 123',
        hard: 'Türler büyük harfle başlar (Int, String), true ve false ise küçük harfle yazılır.',
      },
      {
        h: 'Hesap yapma ve yazı şablonu',
        b: '<p>İşaretler Python daki gibidir: <code>+</code> <code>-</code> <code>*</code> <code>/</code> ve kalan için <code>%</code>.</p><p>Bir yazının içine değişken koymak için <code>$</code> işareti kullanılır: <code>"Merhaba $ad"</code>. Hesap koymak istersen <code>${ }</code> içine yazarsın.</p>',
        code: 'println(7 / 2)     // 3\nprintln(7.0 / 2)   // 3.5\nprintln(7 % 2)     // 1\nval ad = "Ada"\nprintln("Merhaba $ad")        // Merhaba Ada\nprintln("Seneye ${12 + 1}")   // Seneye 13',
        hard: 'İki tam sayıyı bölersen sonuç da tam sayı olur: 7 / 2 sonucu 3 tür, 3.5 değil.',
      },
      {
        h: 'readln ile soru sorma',
        b: '<p><code>readln()</code> kullanıcının yazdığı cevabı alır. Python daki <code>input()</code> ile aynı işi yapar.</p><p>Cevap her zaman <b>String</b> olarak gelir. Sayı olarak kullanmak için sonuna <code>.toInt()</code> eklersin.</p>',
        code: 'val ad = readln()\nprintln("Merhaba $ad")\nval yas = readln().toInt()\nprintln("Seneye ${yas + 1}")',
        hard: 'readln() her zaman String verir. toInt() kullanmazsan yas + 1 hesabı yapılamaz.',
      },
    ],
    review: 'Kotlin kodu sırayla çalışır, süslü parantez kullanır ve fun main() ile başlar. val değişmez, var değişebilir kutudur. Türler: Int, Double, String, Boolean. Tam sayıların bölümü tam sayı çıkar. Yazı içine $ ile değer konur. readln() her zaman String verir, sayı için toInt() gerekir.',
    ex: [
      [
        tf('Kotlin de val ile oluşturulan değişkenin değeri sonradan değiştirilemez.', true, 'val değişmez, var değişebilir.'),
        mc('Hangisi bir String değeridir?', ['7', '3.5', '"merhaba"', 'true'], 2, 'Çift tırnak içindeki değer String dir.'),
        ms('Hangi iki satır doğru bir değişken tanımıdır?', ['var puan = 90', 'puan var = 90', 'val ad = "Can"', 'val = ad "Can"'], [0, 2], 'Önce val ya da var, sonra ad, sonra = ve değer yazılır.'),
        mc('println(7 / 2) ne yazdırır?', ['3.5', '3', '4', '2'], 1, 'İki Int bölününce sonuç da Int olur: 3.'),
        mc('println(10 % 3) ne yazdırır?', ['1', '3', '0', '3.33'], 0, '% kalanı verir. 10 = 3 x 3 + 1, kalan 1 dir.'),
      ],
      [
        mc('Kotlin de ekrana yazıp alt satıra geçen fonksiyon hangisidir?', ['println()', 'show()', 'say()', 'out()'], 0, 'println() ekrana yazar ve alt satıra geçer.'),
        tf('3.5 değeri Int türündedir.', false, 'Ondalıklı sayılar Double türündedir.'),
        ms('Hangi iki değer sayıdır?', ['10', '"10"', '2.5', '"2.5"'], [0, 2], 'Tırnaksız değerler sayıdır.'),
        mc('var a = 4 yazıp sonra a = 9 yazarsan a kaç olur?', ['4', '9', '13', 'hata'], 1, 'Yeni değer eskisinin yerine geçer.'),
        mc('readln() ile alınan değer hangi türdedir?', ['Int', 'Double', 'String', 'Boolean'], 2, 'readln() her zaman String verir.'),
      ],
      [
        mc('Hangisi bir Double sayıdır?', ['8', '"8.5"', '8.5', 'false'], 2, 'Tırnaksız ve noktalı sayı Double dır.'),
        tf('"Ada" bir String değeridir.', true, 'Tırnak içinde olduğu için String dir.'),
        ms('Hangi iki tanım doğrudur?', ['val sayi = 3', '3 = val sayi', 'var isim = "Can"', '"Can" = var isim'], [0, 2], 'Tanımda önce val ya da var, sonra ad gelir.'),
        mc('val ad = "Ece" yazıp println("Merhaba $ad") dersen ne görürsün?', ['Merhaba $ad', 'Merhaba Ece', 'Merhaba "Ece"', 'hata'], 1, '$ad yerine değişkenin değeri yazılır.'),
        mc('println(3 * 4) ne yazdırır?', ['34', '12', '7', 'hata'], 1, '* çarpma yapar. 3 x 4 = 12.'),
      ],
    ],
  },
  {
    id: 'kt2', t: 'Kotlin 2: Koşullar',
    slides: [
      {
        h: 'if ile karar ver',
        b: '<p><code>if</code> \"eğer\" demektir. Koşulu <b>parantez</b> içine yazarız. Doğruysa süslü parantez içindeki satırlar çalışır.</p><p>Python da iki nokta ve girinti kullanıyorduk. Kotlin de bunların yerine <code>( )</code> ve <code>{ }</code> var.</p>',
        code: 'val yas = 13\nif (yas >= 12) {\n    println("Ortaokul öğrencisisin")\n}\nprintln("Bu satır her zaman çalışır")',
        hard: 'Koşul ( ) içine, çalışacak satırlar { } içine yazılır. İki nokta (:) kullanılmaz.',
      },
      {
        h: 'else if ve else',
        b: '<p><code>else</code> \"değilse\" demektir. İkiden fazla seçenek varsa <code>else if</code> kullanırız. Python daki <code>elif</code> in Kotlin karşılığı budur.</p><p>Kotlin yukarıdan aşağı bakar, ilk doğru olanı çalıştırır ve gerisini atlar.</p>',
        code: 'val puan = 70\nif (puan >= 90) {\n    println("Pekiyi")\n} else if (puan >= 50) {\n    println("Geçtin")\n} else {\n    println("Tekrar dene")\n}',
        hard: 'elif yoktur, else if yazılır. İlk doğru koşul çalışır, gerisi atlanır.',
      },
      {
        h: 'Karşılaştırma ve mantık',
        b: '<p>Karşılaştırma işaretleri Python daki gibidir: <code>==</code> <code>!=</code> <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>.</p><p>Mantık kelimelerinin yerine işaret kullanılır: <code>&amp;&amp;</code> (ve), <code>||</code> (veya), <code>!</code> (değil).</p>',
        code: 'println(5 == 5)   // true\nprintln(5 != 3)   // true\nprintln(2 > 7)    // false\nval yas = 13\nval bilet = true\nif (yas > 10 && bilet) {\n    println("İçeri gir")\n}\nprintln(5 > 3 || 2 > 9)   // true\nprintln(!true)            // false',
        hard: 'and, or, not yazmak yok: &amp;&amp;, || ve ! kullanılır. true ve false küçük harfle yazılır.',
      },
      {
        h: 'when ile çoklu seçim',
        b: '<p>Çok seçenek olduğunda <code>when</code> işini kolaylaştırır. Bir değere bakar ve tutan seçeneği çalıştırır.</p><p>Her seçenek <code>değer -&gt; yapılacak iş</code> şeklinde yazılır. Hiçbiri tutmazsa <code>else</code> çalışır.</p>',
        code: 'val gun = 3\nwhen (gun) {\n    1 -> println("Pazartesi")\n    2 -> println("Salı")\n    3 -> println("Çarşamba")\n    else -> println("Başka gün")\n}',
        hard: 'when içinde else yazmak çoğu zaman gerekir. Hiçbir seçenek tutmazsa o çalışır.',
      },
    ],
    review: 'if koşulu parantez, satırlar süslü parantez içine yazılır. İkiden çok seçenek için else if kullanılır ve ilk doğru olan çalışır. == karşılaştırır, = atar. Mantık için &&, || ve ! kullanılır. when çok seçenekli kararlar için uygundur.',
    ex: [
      [
        tf('== işareti iki değeri karşılaştırır.', true, '== \"eşit mi?\" sorusudur.'),
        mc('Kotlin de doğru yazılmış bir koşul hangisidir?', ['if x > 3:', 'if (x > 3) {', 'if x > 3 then', 'if [x > 3]'], 1, 'Koşul parantez içine, satırlar süslü parantez içine yazılır.'),
        ms('Hangi iki işaret mantık işaretidir?', ['&&', '=', '||', '->'], [0, 2], '&& ve || koşulları birleştirir.'),
        mc('val x = 10 iken: if (x > 20) A, else if (x > 5) B, else C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'x > 20 yanlış, x > 5 doğru. İlk doğru olan çalışır.'),
        mc('val x = 6 iken x > 3 && x < 5 sonucu nedir?', ['true', 'false', '6', 'hata'], 1, '&& için ikisi de doğru olmalı. x < 5 yanlış olduğu için sonuç false.'),
      ],
      [
        mc('Koşul yanlışsa hangi blok çalışır?', ['if', 'else', 'println', 'fun'], 1, 'else yanlış durumu karşılar.'),
        tf('Kotlin de if koşulu Python gibi iki nokta ile biter.', false, 'Kotlin de parantez ve süslü parantez kullanılır.'),
        ms('Hangi iki bilgi doğrudur?', ['if koşulu parantez içine yazılır', 'Bloğun satırları { } içine alınır', 'if sonunda iki nokta konur', 'Kotlin de else if yerine elif yazılır'], [0, 1], 'Kotlin de ( ) ve { } kullanılır, elif yoktur.'),
        mc('5 != 3 sonucu nedir?', ['true', 'false', '5', 'hata'], 0, '5 ile 3 farklıdır.'),
        tf('|| kullanırsan koşullardan biri doğru olduğunda sonuç true olur.', true, '|| için en az birinin doğru olması yeter.'),
      ],
      [
        mc('val x = 3 iken if (x == 3) { println("A") } ne yazdırır?', ['A', 'Hiçbir şey', 'hata', '3'], 0, 'x 3 e eşit, koşul doğru.'),
        tf('Koşul yanlışsa if bloğundaki satırlar atlanır.', true, 'Sadece doğru koşulda çalışırlar.'),
        ms('Hangi iki satır doğru yazılmıştır?', ['if (puan >= 50) {', 'if puan >= 50 {', '} else {', 'else (puan < 50) {'], [0, 2], 'if koşulu parantez ister. else koşul almaz.'),
        mc('val yas = 10 iken: yas >= 12 ise "Büyük", değilse "Küçük" yazdırılıyor. Çıktı ne olur?', ['Büyük', 'Küçük', '10', 'hata'], 1, '10 >= 12 yanlış, else çalışır.'),
        mc('val x = 2 iken x == 2 || x == 9 sonucu nedir?', ['true', 'false', '2', 'hata'], 0, 'Birincisi doğru. || için bu yeter.'),
      ],
    ],
  },
  {
    id: 'kt3', t: 'Kotlin 3: Döngüler',
    slides: [
      {
        h: 'for ile tekrar',
        b: '<p><code>for (i in 0..2)</code> altındaki satırları 3 kez çalıştırır. i önce 0, sonra 1, sonra 2 olur.</p><p>Dikkat: Kotlin de <code>..</code> ile yazılan aralıkta bitiş sayısı <b>dahildir</b>. Python daki <code>range</code> in tersi!</p>',
        code: 'for (i in 0..2) {\n    println("Tur $i")\n}\n// Tur 0\n// Tur 1\n// Tur 2',
        hard: '0..3 yazarsan 3 de dahildir ve 4 tur döner. Python daki range(3) ise 3 ü almıyordu.',
      },
      {
        h: 'until, step ve downTo',
        b: '<p>Bitişi dahil etmek istemezsen <code>until</code> kullan: <code>0 until 3</code> sayıları 0, 1, 2 verir.</p><p><code>step</code> adımı belirler, ikişer ikişer sayabilirsin. <code>downTo</code> ise geriye doğru sayar.</p>',
        code: 'for (i in 0 until 3) { println(i) }       // 0 1 2\nfor (j in 0..10 step 2) { println(j) }    // 0 2 4 6 8 10\nfor (k in 3 downTo 1) { println(k) }      // 3 2 1',
        hard: '.. bitişi alır, until almaz. Bu ikisini karıştırma.',
      },
      {
        h: 'while ve toplama',
        b: '<p><code>while</code> koşul doğru olduğu sürece tekrar eder. Sayacı değiştirmezsen döngü hiç bitmez. <code>x++</code> değeri bir arttırır.</p><p>Toplama yaparken önce <code>var toplam = 0</code> hazırlarız, her turda yeni sayıyı ekleriz.</p>',
        code: 'var x = 0\nwhile (x < 3) {\n    println(x)\n    x++\n}\nvar toplam = 0\nfor (i in 0..3) {\n    toplam = toplam + i\n}\nprintln(toplam)   // 0+1+2+3 = 6',
        hard: 'x++ unutulursa sonsuz döngü olur. Toplam değişeceği için val değil var olmalı.',
      },
    ],
    review: 'for (i in 0..2) bitişi dahil eder, 0 until 3 dahil etmez. step adımı, downTo geriye sayımı belirler. while koşul doğruyken tekrar eder ve sayaç değişmezse sonsuza gider. x++ bir arttırır. Toplam için var toplam = 0 döngüden önce yazılır.',
    ex: [
      [
        tf('0..2 değerleri 0, 1 ve 2 dir.', true, '.. ile bitiş dahildir.'),
        mc('for (i in 0 until 4) { println(i) } kaç satır yazdırır?', ['3', '4', '5', '1'], 1, 'until 4 dört sayı verir: 0, 1, 2, 3.'),
        ms('Hangi ikisi bir döngü yapısıdır?', ['for', 'if', 'while', 'println'], [0, 2], 'for ve while tekrar için kullanılır.'),
        mc('while döngüsünde sayaç hiç değişmezse ne olur?', ['Döngü sonsuza kadar sürer', 'Döngü hiç çalışmaz', 'Hata verir ve başlamaz', 'Bir kez çalışıp durur'], 0, 'Koşul hiç yanlış olmayacağı için döngü bitmez.'),
        tf('var toplam = 0 satırı döngüden önce yazılır.', true, 'Toplamın bir başlangıç değeri olmalıdır.'),
      ],
      [
        mc('1 until 4 hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], 0, 'Başlangıç dahil, bitiş dahil değildir.'),
        tf('while döngüsü koşul yanlış olunca durur.', true, 'Koşul her turda kontrol edilir.'),
        ms('Hangi ikisi doğrudur?', ['0 until 5 beş sayı üretir', '0 until 5 içinde 5 de vardır', 'for döngüsü tekrar için kullanılır', 'x++ yazmak x i 2 arttırır'], [0, 2], '0 until 5: 0, 1, 2, 3, 4. x++ bir arttırır.'),
        mc('var toplam = 0 iken for (i in 0..2) { toplam = toplam + i } çalışırsa toplam kaç olur?', ['3', '6', '0', '2'], 0, '0 + 1 + 2 = 3.'),
        mc('1..4 hangi sayıları verir?', ['1, 2, 3', '1, 2, 3, 4', '2, 3, 4', '0, 1, 2, 3'], 1, '.. ile bitiş dahildir.'),
      ],
      [
        mc('for (i in 0 until 2) { println("Merhaba") } kaç kez Merhaba yazdırır?', ['1', '2', '3', '0'], 1, 'until 2 iki tur döner.'),
        tf('0 until 5 içinde 5 sayısı da bulunur.', false, 'until bitişi almaz: 0, 1, 2, 3, 4.'),
        ms('Hangi iki bilgi doğrudur?', ['while koşul doğruyken tekrar eder', 'for döngüsünde i her turda yeni değer alır', 'while döngüsü hiç durmaz', '0..3 sayıları 0, 1, 2 verir'], [0, 1], 'while durabilir, 0..3 ise 3 dahil dört sayı verir.'),
        mc('var sayac = 0 iken while (sayac < 3) { sayac++ } kaç tur döner?', ['2', '3', '4', 'sonsuz'], 1, 'sayac 0, 1, 2 iken döner, 3 olunca durur.'),
        mc('0..10 step 2 hangi sayıları verir?', ['0, 2, 4, 6, 8, 10', '2, 4, 6, 8, 10', '0, 2, 4, 6, 8', '1, 3, 5, 7, 9'], 0, 'step adımdır. .. bitişi dahil ettiği için 10 da vardır.'),
      ],
    ],
  },
  {
    id: 'kt4', t: 'Kotlin 4: Listeler',
    slides: [
      {
        h: 'Liste nedir?',
        b: '<p>Liste, birçok değeri tek kutuda tutar. Kotlin de liste <code>listOf( )</code> ile yapılır, elemanlar virgülle ayrılır.</p><p>Eleman sayısını <code>size</code> verir. Python daki <code>len()</code> in karşılığı budur.</p>',
        code: 'val meyveler = listOf("elma", "armut", "kiraz")\nprintln(meyveler)        // [elma, armut, kiraz]\nprintln(meyveler.size)   // 3',
        hard: 'Python da köşeli parantez yazardık, Kotlin de listOf( ) yazılır. Eleman sayısı için size kullanılır.',
      },
      {
        h: 'Sıra numarası (indeks)',
        b: '<p>Sıra numarası burada da <b>0 dan</b> başlar. Bir elemana köşeli parantezle ulaşırız: <code>meyveler[0]</code>.</p><p>Son elemanı almak için <code>last()</code> kullanılır.</p>',
        code: 'val meyveler = listOf("elma", "armut", "kiraz")\nprintln(meyveler[0])      // elma\nprintln(meyveler[1])      // armut\nprintln(meyveler.last())  // kiraz',
        hard: 'Python daki [-1] Kotlin de çalışmaz. Son eleman için last() yaz.',
      },
      {
        h: 'Değiştirilebilir liste',
        b: '<p><code>listOf</code> ile yapılan liste <b>değiştirilemez</b>. Eleman eklemek ya da değiştirmek istiyorsan <code>mutableListOf</code> kullan.</p><p><code>add()</code> sona ekler. Elemanları sırayla gezmek için <code>for (m in liste)</code> yazılır.</p>',
        code: 'val meyveler = mutableListOf("elma", "armut")\nmeyveler.add("muz")        // sona ekler\nmeyveler[0] = "çilek"      // ilkini değiştirir\nfor (m in meyveler) {\n    println(m)\n}\n// çilek\n// armut\n// muz',
        hard: 'listOf ile yaptığın listeye add() yazamazsın. Değişecek liste mutableListOf ile yapılır.',
      },
    ],
    review: 'Liste listOf( ) ile yapılır, size eleman sayısını verir. Sıra numarası 0 dan başlar, son eleman last() ile alınır. listOf değiştirilemez, mutableListOf ile add() ve atama yapılabilir. for (m in liste) ile elemanlar sırayla gezilir.',
    ex: [
      [
        tf('Kotlin de liste listOf ile oluşturulabilir.', true, 'listOf( ) liste yapar.'),
        mc('val sayilar = listOf(10, 20, 30) ise sayilar[0] kaçtır?', ['10', '20', '30', '0'], 0, 'İlk elemanın sıra numarası 0 dır.'),
        ms('Hangi iki satır doğru bir liste tanımıdır?', ['listOf(1, 2, 3)', 'listOf[1, 2, 3]', 'mutableListOf("a", "b")', 'list(1 2 3)'], [0, 2], 'listOf ve mutableListOf parantezle yazılır, elemanlar virgülle ayrılır.'),
        mc('listOf("a", "b", "c", "d").size ne verir?', ['3', '4', '5', 'hata'], 1, 'Listede 4 eleman var.'),
        tf('Listenin ilk elemanının sıra numarası 1 dir.', false, 'Sıra numarası 0 dan başlar.'),
      ],
      [
        mc('val l = listOf("a", "b", "c") ise l[2] nedir?', ['a', 'b', 'c', 'hata'], 2, 'l[0]=a, l[1]=b, l[2]=c.'),
        tf('add() değiştirilebilir listenin sonuna eleman ekler.', true, 'Yeni eleman en sona eklenir.'),
        ms('Hangi iki bilgi doğrudur?', ['Liste birden fazla değer tutabilir', 'Sıra numarası 1 den başlar', 'size listenin eleman sayısını verir', 'add() listenin başına ekler'], [0, 2], 'Sıra numarası 0 dan başlar, add() sona ekler.'),
        mc('val x = mutableListOf(5, 6) yazıp x.add(7) çalıştırırsan x.size kaç olur?', ['2', '3', '4', '7'], 1, 'Liste [5, 6, 7] olur, 3 eleman var.'),
        tf('Kotlin de l[-1] listenin son elemanıdır.', false, 'Kotlin de son eleman için last() kullanılır.'),
      ],
      [
        mc('val s = mutableListOf(4, 8, 12) iken s[1] = 9 yazılırsa liste ne olur?', ['[4, 9, 12]', '[9, 8, 12]', '[4, 8, 9]', '[4, 8, 12, 9]'], 0, 'Sıra numarası 1 olan ikinci eleman değişir.'),
        tf('for (x in liste) listenin her elemanını sırayla gezer.', true, 'x her turda bir sonraki eleman olur.'),
        ms('a bir mutableListOf ise hangi iki satır doğru yazılmıştır?', ['a.add(3)', 'a[0] = 3', 'a(3)', 'a.append 3'], [0, 1], 'add() sona ekler, a[0] = 3 ilk elemanı değiştirir.'),
        mc('for (m in listOf("a", "b")) { println(m) } kaç satır yazdırır?', ['1', '2', '3', '0'], 1, 'Listede 2 eleman var, 2 tur döner.'),
        tf('listOf(10, 20, 30) listesinde 30 un sıra numarası 3 tür.', false, 'Sıra numarası 0 dan başladığı için 30 un numarası 2 dir.'),
      ],
    ],
  },
  {
    id: 'kt5', t: 'Kotlin 5: Fonksiyonlar',
    slides: [
      {
        h: 'Fonksiyon nedir?',
        b: '<p>Fonksiyon, bir kez yazıp istediğin kadar kullanabildiğin küçük bir makinedir. Kotlin de <code>fun</code> ile tanımlanır. Aslında <code>main</code> ve <code>println</code> de birer fonksiyondur.</p><p>Fonksiyonu çalıştırmak için adını ve parantezi yazarız. Buna <b>çağırmak</b> denir.</p>',
        code: 'fun selam() {\n    println("Merhaba!")\n    println("Nasılsın?")\n}\n\nfun main() {\n    selam()\n    selam()\n}',
        hard: 'fun sadece fonksiyonu hazırlar. Çalışması için main içinde selam() diye çağırmalısın.',
      },
      {
        h: 'Parametre ile bilgi ver',
        b: '<p>Fonksiyona bilgi vermek için parantezin içine <b>parametre</b> yazarız. Kotlin de her parametrenin türünü iki noktadan sonra yazmak gerekir: <code>ad: String</code>.</p><p>Çağırırken ise sadece değeri yazarsın.</p>',
        code: 'fun selam(ad: String) {\n    println("Merhaba $ad")\n}\n\nfun main() {\n    selam("Ada")   // Merhaba Ada\n    selam("Can")   // Merhaba Can\n}',
        hard: 'Parametrenin türünü yazmak zorundasın: ad: String. Python da buna gerek yoktu.',
      },
      {
        h: 'Sonuç döndürme',
        b: '<p>Fonksiyonun sonuç vermesini istersen <code>return</code> kullanırsın. Sonucun türü parantezden sonra iki noktayla yazılır: <code>: Int</code>.</p><p>Tek satırlık fonksiyonlar kısa yazılabilir: <code>= a + b</code>.</p>',
        code: 'fun topla(a: Int, b: Int): Int {\n    return a + b\n}\nfun kare(n: Int) = n * n   // kısa yazım\n\nfun main() {\n    println(topla(3, 4))   // 7\n    println(kare(5))       // 25\n}',
        hard: 'Parantezden sonraki : Int sonucun türünü söyler. return ettiğin değer bu türde olmalı.',
      },
    ],
    review: 'Fonksiyon fun ile tanımlanır. Tanımlamak çalıştırmaz, adını parantezle yazarak çağırırız. Parametrenin türü yazılır: ad: String. return sonucu geri verir ve sonucun türü : Int gibi yazılır. println ise sadece ekrana yazar.',
    ex: [
      [
        tf('Kotlin de fonksiyon fun kelimesiyle tanımlanır.', true, 'fun, function yani fonksiyon demektir.'),
        mc('Tanımlanmış bir fonksiyonu çalıştırmak için ne yaparız?', ['Adını parantezle yazarız: selam()', 'Sadece fun yazarız', 'import yazarız', 'Hiçbir şey yapmayız'], 0, 'Fonksiyonu çağırmak için adının yanına parantez koyarız.'),
        ms('Hangi iki satır doğru bir fonksiyon başlığıdır?', ['fun selam() {', 'def selam() {', 'fun topla(a: Int, b: Int): Int {', 'fun topla(a, b) {'], [0, 2], 'fun, ad, parantez ve türler gerekir.'),
        mc('fun f(x: Int): Int { return x * 2 } yazılırsa println(f(5)) ne yazdırır?', ['5', '10', '25', 'hata'], 1, '5 * 2 = 10.'),
        tf('fun yazmak fonksiyonu hemen çalıştırır.', false, 'fun sadece tanımlar. Çalışması için çağırmak gerekir.'),
      ],
      [
        mc('fun topla(a: Int, b: Int): Int { return a + b } yazılırsa topla(2, 3) sonucu nedir?', ['23', '5', '6', 'hata'], 1, '2 + 3 = 5.'),
        tf('Fonksiyona bilgi vermek için parametre kullanılır.', true, 'Parametre fonksiyonun aldığı bilgidir.'),
        ms('Hangi iki bilgi doğrudur?', ['Fonksiyon bir kez yazılır, birçok kez çağrılır', 'Parametrenin türü yazılmaz', 'return sonucu geri verir', 'Fonksiyonda parametre olamaz'], [0, 2], 'Kotlin de parametrenin türü yazılır ve parametre kullanılabilir.'),
        mc('fun kare(n: Int) = n * n yazılırsa kare(4) kaçtır?', ['8', '16', '44', 'hata'], 1, '4 * 4 = 16.'),
        tf(': Int ifadesi fonksiyonun Int türünde sonuç döndürdüğünü gösterir.', true, 'Parantezden sonraki tür, sonucun türüdür.'),
      ],
      [
        mc('fun selam(ad: String) { println("Merhaba $ad") } yazılırsa selam("Ece") ne yazdırır?', ['Merhaba ad', 'Merhaba Ece', 'Ece', 'hata'], 1, 'ad parametresi "Ece" değerini alır.'),
        tf('Aynı fonksiyon farklı değerlerle birden fazla kez çağrılabilir.', true, 'Fonksiyonun amacı budur.'),
        ms('Hangi iki satır bir fonksiyonu çağırır?', ['topla(1, 2)', 'fun topla(1, 2)', 'selam()', 'fun selam() {'], [0, 2], 'fun tanımlar, ad ve parantez ise çağırır.'),
        mc('Bir fonksiyon "A" yazdırıyor ve onu 2 kez çağırıyorsun. Kaç tane A görürsün?', ['0', '1', '2', '3'], 2, 'Her çağrıda bir kez çalışır.'),
        tf('return ile println aynı işi yapar.', false, 'println ekrana yazar, return değeri geri verir.'),
      ],
    ],
  },
]

export const KTF: Q[] = [
  mc('Hangisi String değeridir?', ['12', '"12"', '12.0', 'true'], 1, 'Çift tırnak içindeki değer String dir.'),
  mc('val liste = listOf(5, 10, 15) iken liste[1] kaçtır?', ['5', '10', '15', '1'], 1, 'Sıra numarası 0 dan başlar: liste[0]=5, liste[1]=10.'),
  ms('Hangi iki satır doğru bir değişken tanımıdır?', ['val sayi1 = 5', '5 = val sayi1', 'var ad = "Ece"', 'var "Ece" = ad'], [0, 2], 'Önce val ya da var, sonra ad gelir.'),
  mc('val x = 7 iken: if (x > 10) A, else if (x > 5) B, else C yazdırılıyor. Çıktı ne olur?', ['A', 'B', 'C', 'Hiçbiri'], 1, 'İlk doğru koşul çalışır.'),
  mc('fun kare(n: Int) = n * n tanımından sonra kare(3) ne verir?', ['6', '9', '33', 'hata'], 1, '3 * 3 = 9.'),
  ms('Hangi ikisi karşılaştırma işaretidir?', ['==', '=', '>=', '<-'], [0, 2], '= atama yapar, karşılaştırmaz.'),
  mc('0 until 3 kaç tur döndürür?', ['2', '3', '4', '0'], 1, '0, 1, 2 olmak üzere 3 tur.'),
  tf('while döngüsünde sayaç artmazsa döngü sonsuz olabilir.', true, 'Koşul hiç yanlış olmaz.'),
  mc('var toplam = 0 iken for (i in 0..3) { toplam = toplam + i } çalışırsa toplam kaç olur?', ['4', '6', '10', '3'], 1, '0 + 1 + 2 + 3 = 6. 0..3 de 3 dahildir.'),
  ms('Hangi iki bilgi doğrudur?', ['println() ekrana yazar', 'val ile tanımlanan değişken sonradan değişir', 'add() değiştirilebilir listenin sonuna ekler', 'readln() sayı verir'], [0, 2], 'val değişmez, readln() String verir.'),
]
