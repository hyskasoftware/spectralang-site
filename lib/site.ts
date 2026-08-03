export const site = {
  name: "SpectraLang",
  version: "0.2.7",
  tagline:
    "A language designed for AI/ML workloads and first-class API services.",
  status: "active development",
  repo: "https://github.com/Hyska-Software/SpectraLang",
  license: "MIT",
} as const;

export const stats = [
  { value: "6", label: "reference chapters" },
  { value: "62", label: "documented topics" },
  { value: "10", label: "CLI commands" },
  { value: "3", label: "OS targets" },
] as const;

export const faqs = [
  {
    q: "What is SpectraLang?",
    a: "SpectraLang is an open-source, JIT-compiled programming language designed for AI/ML workloads and first-class API services. It makes tensors, reverse-mode autodiff and differentiable regions language-level constructs instead of libraries, and ships an HTTP server/client stack (spectra.api) in its standard library.",
    href: "/docs/introducao",
    hrefLabel: "Introduction reference",
  },
  {
    q: "Is SpectraLang open source?",
    a: "Yes. SpectraLang is 100% open source and released under the MIT License. The full toolchain — compiler, runtime, CLI and LSP — lives in the public Hyska-Software/SpectraLang repository on GitHub.",
    href: "https://github.com/Hyska-Software/SpectraLang",
    hrefLabel: "GitHub repository",
  },
  {
    q: "How do I install SpectraLang?",
    a: "SpectraLang ships prebuilt binaries: a Windows installer (stable), Linux .deb packages and macOS ARM64/x64 binaries (experimental). You can also build the entire toolchain from source with cargo in four commands. See the install page for platform assets and build steps.",
    href: "/docs/install",
    hrefLabel: "Installation guide",
  },
  {
    q: "How is SpectraLang different from Python for machine learning?",
    a: "Unlike Python, where tensors and autodiff are imported libraries, SpectraLang implements them as language-level constructs: typed tensors (Tensor<T, R>) with shape and dtype constraints, reverse-mode autodiff, SSA-based IR with JIT execution, and ONNX import/export for interop. The language reference documents the tensor and ML framework layers in detail.",
    href: "/docs/stdlib",
    hrefLabel: "Standard library reference",
  },
  {
    q: "Can I build web APIs with SpectraLang?",
    a: "Yes. The spectra.api package provides a first-class HTTP/1.1 server and client, routing, middleware, JSON and typed Request/Response primitives, backed by a platform-aware async reactor (epoll / IOCP / kqueue). Database drivers for PostgreSQL, SQLite and Redis are in development.",
    href: "/docs/introducao",
    hrefLabel: "API platform docs",
  },
  {
    q: "Which platforms does SpectraLang support?",
    a: "Windows is the stable target, with Linux (.deb and tarballs) and macOS (ARM64 and x64) builds available as experimental. The CLI works uniformly across all three: compile, run, check, lint, bench, fmt, repl, new, package and release-info.",
    href: "/docs/cli",
    hrefLabel: "CLI reference",
  },
  {
    q: "What can I build with the standard library?",
    a: "The standard library covers std.io, std.string, std.math, std.convert, std.collections, std.tensor, std.ml, std.time and more. The ML framework layer includes layers, losses, optimizers, datasets and dataloaders, plus experiment tracking and distributed-training foundations.",
    href: "/docs/stdlib",
    hrefLabel: "Stdlib reference",
  },
] as const;

export const nav = [
  { label: "Features", href: "/#features" },
  { label: "Code", href: "/#code" },
  { label: "Install", href: "/#install" },
  { label: "Docs", href: "/docs" },
] as const;

export const features = [
  {
    id: "ai-ml",
    title: "AI/ML CORE",
    code: "std.tensor",
    points: [
      "First-class tensors with shape and dtype constraints (Tensor<T, R>)",
      "Reverse-mode autodiff and differentiable regions as language-level constructs",
      "SSA-based IR with optimization passes and JIT execution",
      "ML framework layer: layers, losses, optimizers, datasets, dataloaders",
      "ONNX import/export, NumPy .npy interchange, Python/FFI bridges",
      "Experiment tracking, distributed-training foundations, reproducibility tooling",
    ],
  },
  {
    id: "api",
    title: "API PLATFORM",
    code: "spectra.api",
    points: [
      "First-class async/await with a platform-aware reactor (epoll / IOCP / kqueue)",
      "spectra.api package: HTTP/1.1 server and client, JSON, routing, middleware",
      "Typed HTTP primitives: Request, Response, Method, Status, Header, Cookie",
      "Database drivers for PostgreSQL, SQLite, and Redis (in development)",
      "TLS, authentication, validation, and structured error handling on the roadmap",
      "Observability: OpenTelemetry tracing, Prometheus metrics, health checks",
    ],
  },
] as const;

export const cliCommands = [
  { cmd: "spectralang compile <paths>", desc: "Compile Spectra modules (default)." },
  { cmd: "spectralang check <paths>", desc: "Type-check modules and report diagnostics without executing." },
  { cmd: "spectralang run <paths>", desc: "Compile modules and execute the entry point via JIT." },
  { cmd: "spectralang lint <paths>", desc: "Run lint checks and report warnings or denied rules." },
  { cmd: "spectralang bench <paths>", desc: "Compile with timing metrics and optional JSON report." },
  { cmd: "spectralang fmt <paths>", desc: "Format Spectra source files." },
  { cmd: "spectralang repl", desc: "Start an interactive Spectra prompt." },
  { cmd: "spectralang new <path>", desc: "Scaffold a new Spectra project." },
  { cmd: "spectralang package <action>", desc: "Resolve, lock, build, publish, and consume packages." },
  { cmd: "spectralang release-info", desc: "Report CLI and package release channel metadata." },
] as const;

export const installSteps = [
  { cmd: "git clone https://github.com/Hyska-Software/SpectraLang.git", desc: "Clone the repository" },
  { cmd: "cd SpectraLang", desc: "Enter the workspace" },
  { cmd: "cargo build", desc: "Build the full workspace (compiler, runtime, CLI, LSP)" },
  { cmd: "cargo install --path tools/spectra-cli", desc: "Install the spectralang CLI on your PATH" },
] as const;

export const docLinks = [
  { title: "Quick Start", href: "/docs/usage", note: "first module in minutes" },
  { title: "Language reference", href: "/docs/introducao", note: "6 chapters, 62 topics" },
  { title: "Standard library", href: "/docs/stdlib", note: "io · string · math · tensor · ml" },
  { title: "CLI reference", href: "/docs/cli", note: "commands, flags, exit codes" },
] as const;

export const codeSamples = {
  quickstart: {
    label: "quickstart.spectra",
    title: "Quickstart",
    file: "examples/syntax_quickstart.spectra",
    code: `module syntax_quickstart
from std.io import println
func welcome(name: string) returns string {
    return f"Hello, {name}!"
}
public func main() returns int {
    let name    = "SpectraLang"
    let message = welcome(name)
    println(message)
    let total = 0
    for item in [1, 2, 3] {
        total = total + item
    }
    if total > 5 and not total == 0 {
        println("clear syntax")
    } else {
        println("keep exploring")
    }
    return 0
}`,
  },
  basic: {
    label: "basic.spectra",
    title: "Basic",
    file: "examples/basic.spectra",
    code: `// SpectraLang - Basic Example
// Simple and functional syntax

module basic

public func main() {
    let x            = 10
    let y            = 20
    let sum          = x + y
    let product      = x * y
    let is_positive  = x > 0
    let is_equal     = x == 10
    let is_different = x != y
    let check        = is_positive and is_equal

    return
}

func add(a: int, b: int) returns int {
    let result = a + b
    return result
}

func multiply(a: int, b: int) returns int {
    return a * b
}

func is_even(n: int) returns bool {
    let remainder = n % 2
    let result    = remainder == 0
    return result
}

func max(a: int, b: int) returns int {
    let greater = a > b
    return a
}

func calculate(x: int, y: int, z: int) returns int {
    let temp1  = x + y
    let temp2  = temp1 * z
    let result = temp2 - 10
    return result
}`,
  },
  fibonacci: {
    label: "fibonacci.spectra",
    title: "Fibonacci",
    file: "examples/fibonacci.spectra",
    code: `// SpectraLang - Example: Fibonacci
// Demonstrates loops, recursion, and clean syntax

module fibonacci
import std.io

public func main() {
    println("=== Fibonacci Sequence ===")

    // Iterative Fibonacci
    println("Iterative approach:")
    let fib_iter = fibonacci_iterative(10)
    println(fib_iter)

    // Fibonacci with a for loop
    println("First 10 Fibonacci numbers:")
    print_fibonacci_sequence(10)

    return
}

// Iterative version (more efficient)
func fibonacci_iterative(n: int) returns int {
    if n <= 1 {
        return n
    }

    let prev = 0
    let curr = 1
    let i    = 2

    while i <= n {
        let next = prev + curr
        prev = curr
        curr = next
        i = i + 1
    }

    return curr
}

// Prints the sequence
func print_fibonacci_sequence(count: int) {
    let i = 0

    while i < count {
        let fib = fibonacci_iterative(i)
        println(fib)
        i = i + 1
    }

    return
}

// Checks if a number is in the Fibonacci sequence
func is_fibonacci(num: int) returns bool {
    if num < 0 {
        return false
    }

    let a = 0
    let b = 1

    if num == a or num == b {
        return true
    }

    let c = a + b

    while c <= num {
        if c == num {
            return true
        }
        a = b
        b = c
        c = a + b
    }

    return false
}

// Sum of the first N Fibonacci numbers
func sum_fibonacci(n: int) returns int {
    let sum = 0
    let i   = 0

    while i < n {
        let fib = fibonacci_iterative(i)
        sum = sum + fib
        i = i + 1
    }

    return sum
}`,
  },
  traits: {
    label: "traits_demo.spectra",
    title: "Traits",
    file: "examples/traits_demo.spectra",
    code: `// Complete demonstration of SpectraLang's Traits system
module traits_demo

// ============================================
// 1. BASIC TRAIT - Interface for printing
// ============================================

trait Printable {
    func to_string( & self) returns int
    func debug( & self) returns int
}

// ============================================
// 2. TRAIT FOR MATH OPERATIONS
// ============================================

trait Calculable {
    func add( & self, x: int, y: int) returns int
    func multiply( & self, x: int, y: int) returns int
    func get_value( & self) returns int
}

// ============================================
// 3. STRUCTS THAT IMPLEMENT TRAITS
// ============================================

record Point {
    x: int,
    y: int
}

record Calculator {
    base: int
}

// ============================================
// 4. IMPLEMENTATIONS
// ============================================

// Point implements Printable
impl Printable for Point {
    func to_string( & self) returns int {
        // Returns the sum of the coordinates (simulation)
        self.x + self.y
    }

    func debug( & self) returns int {
        // Returns the product of the coordinates
        self.x * self.y
    }
}

// Calculator implements Calculable
impl Calculable for Calculator {
    func add( & self, x: int, y: int) returns int {
        // Adds the base value
        self.base + x + y
    }

    func multiply( & self, x: int, y: int) returns int {
        // Multiplies by the base value
        self.base * x * y
    }

    func get_value( & self) returns int {
        self.base
    }
}

// Calculator also implements Printable
impl Printable for Calculator {
    func to_string( & self) returns int {
        self.base
    }

    func debug( & self) returns int {
        self.base * 10
    }
}

// ============================================
// 5. MULTIPLE TRAITS ON THE SAME TYPE
// ============================================

record MultiTrait {
    value: int
}

impl Printable for MultiTrait {
    func to_string( & self) returns int {
        self.value
    }

    func debug( & self) returns int {
        self.value * 2
    }
}

impl Calculable for MultiTrait {
    func add( & self, x: int, y: int) returns int {
        self.value + x + y
    }

    func multiply( & self, x: int, y: int) returns int {
        self.value * x * y
    }

    func get_value( & self) returns int {
        self.value
    }
}

// ============================================
// 6. MAIN FUNCTION - DEMONSTRATION
// ============================================

func main() returns int {
    // Test 1: Point with Printable
    let p        = Point { x: 10, y: 20 }
    let p_string = p.to_string()
    // 30 (10 + 20)
    let p_debug = p.debug()
    // 200 (10 * 20)

    // Test 2: Calculator with both traits
    let calc     = Calculator { base: 5 }
    let calc_add = calc.add(3, 7)
    // 15 (5 + 3 + 7)
    let calc_mul = calc.multiply(2, 4)
    // 40 (5 * 2 * 4)
    let calc_str = calc.to_string()
    // 5
    let calc_dbg = calc.debug()
    // 50 (5 * 10)

    // Test 3: MultiTrait with multiple traits
    let multi     = MultiTrait { value: 3 }
    let multi_str = multi.to_string()
    // 3
    let multi_dbg = multi.debug()
    // 6 (3 * 2)
    let multi_add = multi.add(10, 20)
    // 33 (3 + 10 + 20)
    let multi_mul = multi.multiply(2, 5)
    // 30 (3 * 2 * 5)

    // Result: sum of all tests
    // 30 + 200 + 15 + 40 + 5 + 50 + 3 + 6 + 33 + 30 = 412
    p_string + p_debug + calc_add + calc_mul + calc_str + calc_dbg +
    multi_str + multi_dbg + multi_add + multi_mul
}`,
  },
  ai: {
    label: "tensor_graph.spectra",
    title: "AI/ML",
    file: "examples/ai/tensor_graph_elementwise_fusion.spectra",
    code: `// AI graph example: elementwise chain that the R-1602 graph optimizer can fuse.
module ai_tensor_graph_elementwise_fusion

import std.tensor as tensor

public func main() returns int {
    tensor.free_all()
    tensor.reset_stats()

    let input      = tensor.full_f(8, 4.0)
    let activated  = tensor.relu(input)
    let normalized = tensor.sqrt_f(activated)
    let projected  = tensor.tanh_f(normalized)

    if tensor.len(projected) != 8 {
        return tensor.len(projected)
    }
    if tensor.get_f(projected, 0) <= 0.0 {
        return 1
    }
    if tensor.stats_kernel_ops() < 3 {
        return 2
    }

    tensor.free_all()
    return 0
}`,
  },
  api: {
    label: "00_hello_http.spectra",
    title: "API",
    file: "examples/api/00_hello_http.spectra",
    code: `module hello_http

from std.api.server import Server, new, listen, serve, shutdown, local_port, state

from std.api.routing import Router, Route, router, get, route_id

from std.api.handler import HandlerHandle, text, with_header, register_sync, dispatch_sync

from std.api.http import Request, Response, method_get, request, response_status, response_header, response_body_len

public func main() returns int {
    let routes: Router = router()
    let route: Route   = get(routes, "/hello")
    if route_id(route) == 0 {
        return 1
    }

    let response: Response = with_header(text("Hello HTTP from Spectra"), "Content-Type", "text/plain")
    if response_status(response) != 200 {
        return 2
    }
    if response_header(response, "content-type") != "text/plain" {
        return 3
    }
    if response_body_len(response) <= 0 {
        return 4
    }

    let handler: HandlerHandle = register_sync(route_id(route), response)
    let request_value: Request = request(method_get(), "/hello")
    let dispatched: Response   = dispatch_sync(handler, request_value)
    if response_status(dispatched) != 200 {
        return 5
    }

    let server: Server = new()
    if listen(server, 0) != true {
        return 6
    }
    if block_on(serve(server, routes)) != 1 {
        return 7
    }
    if state(server) != 2 {
        return 8
    }
    if local_port(server) <= 0 {
        return 9
    }
    if shutdown(server) != true {
        return 10
    }
    if state(server) != 3 {
        return 11
    }

    return 0
}`,
  },
} as const;
