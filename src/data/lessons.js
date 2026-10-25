/**
 * ВИДЕО ХИЧЭЭЛҮҮД
 * ------------------------------------------------------------
 * `youtubeUrl` талбарт YouTube дээр байршуулсан бичлэгийнхээ холбоосыг тавина.
 * Дараах бүх хэлбэр ажиллана:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://www.youtube.com/shorts/VIDEO_ID
 *   VIDEO_ID
 * Хоосон ('') үлдээвэл "Видео удахгүй нэмэгдэнэ" гэсэн загвар харагдана.
 *
 * Зөвлөгөө: YouTube дээр бичлэгээ "Unlisted" болгож байршуулбал зөвхөн
 * энэ сайтаар л үзэгдэнэ. Embed тоглуулагч нь татах товчгүй.
 */
export const lessons = [
  {
    id: 1,
    title: 'C++ хэлтэй танилцах, орчин бэлдэх',
    summary: 'Программ гэж юу вэ, C++ хаана хэрэглэгддэг, компьютер дээрээ кодлох орчныг хэрхэн бэлдэх, анхны программаа бичих.',
    duration: '18 мин',
    level: 'easy',
    topics: ['io'],
    youtubeUrl: '',
    points: [
      'Программ, компайлер гэж юу вэ',
      'Code::Blocks / VS Code суулгах',
      '`#include`, `main()` функцийн бүтэц',
      'Анхны программ: Hello, World!',
    ],
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    id: 2,
    title: 'Хувьсагч, өгөгдлийн төрөл, оролт гаралт',
    summary: 'int, long long, double, char, string төрлүүд. Гараас утга уншиж (cin), дэлгэцэнд хэвлэх (cout), арифметик үйлдлүүд.',
    duration: '24 мин',
    level: 'easy',
    topics: ['io'],
    youtubeUrl: '',
    points: [
      'Хувьсагч зарлах, утга оноох',
      '`int` ба `long long`-ийн ялгаа, overflow',
      '`cin` ба `cout`, `setprecision`',
      'Арифметик үйлдэл: + − * / %',
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;          // гараас 2 тоо орно
    cout << a + b << "\\n";  // нийлбэрийг хэвлэ

    double x = 7.0 / 2;
    cout << fixed << setprecision(2) << x << "\\n"; // 3.50
}`,
  },
  {
    id: 3,
    title: 'Нөхцөл шалгах: if, else, switch',
    summary: 'Логик үйлдлүүд, харьцуулах оператор, if / else if / else, switch бүтэц болон түгээмэл алдаанууд.',
    duration: '22 мин',
    level: 'easy',
    topics: ['condition'],
    youtubeUrl: '',
    points: [
      'Харьцуулах оператор: == != < > <= >=',
      'Логик үйлдэл: && || !',
      '`if / else if / else` дараалал',
      '`switch` ба `break`',
    ],
    code: `int n;
cin >> n;
if (n > 0)       cout << "POSITIVE";
else if (n < 0)  cout << "NEGATIVE";
else             cout << "ZERO";`,
  },
  {
    id: 4,
    title: 'Давталт: for, while, do-while',
    summary: 'Давталтын төрлүүд, давталт доторх давталт, break/continue, цифрүүдтэй ажиллах, анхны тоо шалгах.',
    duration: '28 мин',
    level: 'easy',
    topics: ['loop'],
    youtubeUrl: '',
    points: [
      '`for` давталтын 3 хэсэг',
      '`while` ба `do-while`',
      '`break`, `continue`',
      'Nested loop: хээ зурах',
    ],
    code: `int n; cin >> n;
long long sum = 0;
for (int i = 1; i <= n; i++) {
    sum += i;
}
cout << sum;

// Цифрийн нийлбэр
long long x = 12345, s = 0;
while (x > 0) { s += x % 10; x /= 10; }`,
  },
  {
    id: 5,
    title: 'Массив ба vector',
    summary: 'Нэг ба хоёр хэмжээст массив, vector-ийн үндэс, тоолох массив, хамгийн их/бага утга олох.',
    duration: '26 мин',
    level: 'easy',
    topics: ['array'],
    youtubeUrl: '',
    points: [
      'Статик массив ба `vector<int>`',
      'Индекс 0-ээс эхэлдэг',
      'Тоолох массив `cnt[x]++`',
      'Хоёр хэмжээст массив (матриц)',
    ],
    code: `int n; cin >> n;
vector<int> a(n);
for (int &x : a) cin >> x;

int mx = *max_element(a.begin(), a.end());
long long sum = accumulate(a.begin(), a.end(), 0LL);
cout << mx << " " << sum;`,
  },
  {
    id: 6,
    title: 'Мөр (string) боловсруулах',
    summary: 'string төрөл, тэмдэгт бүрээр явах, getline, palindrome шалгах, ASCII код, том жижиг үсэг.',
    duration: '25 мин',
    level: 'easy',
    topics: ['string'],
    youtubeUrl: '',
    points: [
      '`string` ба `char`',
      '`s.size()`, `s[i]`, `substr`',
      '`getline(cin, s)`',
      'ASCII: `c - \'a\'`',
    ],
    code: `string s; cin >> s;
string r = s;
reverse(r.begin(), r.end());
cout << (s == r ? "YES" : "NO");`,
  },
  {
    id: 7,
    title: 'Функц ба рекурс',
    summary: 'Функц тодорхойлох, утга буцаах, reference, рекурсын санаа, backtracking-ийн суурь.',
    duration: '30 мин',
    level: 'medium',
    topics: ['function', 'recursion'],
    youtubeUrl: '',
    points: [
      'Функцийн параметр, буцаах утга',
      'Утгаар ба reference-ээр дамжуулах',
      'Рекурсын суурь нөхцөл',
      'Backtracking: сэлгэмэл үүсгэх',
    ],
    code: `long long gcd(long long a, long long b) {
    if (b == 0) return a;      // суурь нөхцөл
    return gcd(b, a % b);      // рекурс
}

int main() {
    cout << gcd(12, 18);       // 6
}`,
  },
  {
    id: 8,
    title: 'Эрэмбэлэлт ба STL',
    summary: 'sort, comparator, pair, set, map, stack, queue — өрсөлдөөнт программчлалын өдөр тутмын хэрэгслүүд.',
    duration: '32 мин',
    level: 'medium',
    topics: ['sort', 'stl', 'stack'],
    youtubeUrl: '',
    points: [
      '`sort` ба өөрийн comparator',
      '`pair`, `set`, `map`',
      '`stack`, `queue`, `priority_queue`',
      'Хугацааны үнэлгээ O(n log n)',
    ],
    code: `vector<pair<int,string>> v = {{90,"Bat"},{85,"Dorj"},{90,"Anu"}};
sort(v.begin(), v.end(), [](auto &x, auto &y) {
    if (x.first != y.first) return x.first > y.first;
    return x.second < y.second;
});

map<string,int> cnt;
cnt["apple"]++;`,
  },
  {
    id: 9,
    title: 'Хоёртын хайлт, Prefix sum, Хоёр заагч, Greedy',
    summary: 'O(n²)-оос O(n log n) эсвэл O(n) рүү шилжих гол техникүүд. lower_bound, upper_bound, шунахай сэтгэлгээ.',
    duration: '35 мин',
    level: 'medium',
    topics: ['binary-search', 'prefix-sum', 'two-pointers', 'greedy'],
    youtubeUrl: '',
    points: [
      'Хоёртын хайлт ба `lower_bound`',
      'Prefix sum: интервалын нийлбэр O(1)',
      'Хоёр заагчийн техник',
      'Шунахай алгоритм хэзээ зөв вэ',
    ],
    code: `// Prefix sum
vector<long long> p(n + 1, 0);
for (int i = 1; i <= n; i++) p[i] = p[i-1] + a[i];
// [l, r] нийлбэр
cout << p[r] - p[l-1];

// Хоёртын хайлт
sort(a.begin(), a.end());
int k = upper_bound(a.begin(), a.end(), x) - a.begin();`,
  },
  {
    id: 10,
    title: 'Динамик программчлал ба Граф',
    summary: 'DP-ийн төлөв ба шилжилт, үүргэвчийн бодлого, граф хадгалах, BFS/DFS, Дейкстра — олимпиадын суурь.',
    duration: '40 мин',
    level: 'hard',
    topics: ['dp', 'graph', 'number-theory'],
    youtubeUrl: '',
    points: [
      'DP: төлөв, шилжилт, анхны утга',
      'Үүргэвч, LIS, LCS',
      'Граф: adjacency list',
      'BFS, DFS, Дейкстра',
    ],
    code: `// BFS — 1-р оройгоос бусад хүртэлх зай
vector<int> dist(n + 1, -1);
queue<int> q;
q.push(1); dist[1] = 0;
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : g[u]) if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
    }
}`,
  },
];
