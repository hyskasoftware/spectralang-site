export const site = {
  name: "SpectraLang",
  version: "0.2.7",
  tagline:
    "A Rust-implemented language and toolchain for AI/ML workloads and first-class API services.",
  status: "active development",
  repo: "https://github.com/Estevaobonatto/SpectraLang",
  license: "MIT",
} as const;

export const nav = [
  { label: "Features", href: "#features" },
  { label: "Code", href: "#code" },
  { label: "Install", href: "#install" },
  { label: "Docs", href: "#docs" },
] as const;

export const features = [
  {
    id: "ai-ml",
    title: "AI/ML CORE",
    code: "std.tensor",
    points: [
      "First-class tensors with shape and dtype constraints (Tensor<T, R>)",
      "Reverse-mode autodiff and differentiable regions as language-level constructs",
      "SSA-based IR with optimization passes and Cranelift JIT execution",
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
  { cmd: "git clone https://github.com/Estevaobonatto/SpectraLang.git", desc: "Clone the repository" },
  { cmd: "cd SpectraLang", desc: "Enter the workspace" },
  { cmd: "cargo build", desc: "Build the full workspace (compiler, runtime, CLI, LSP)" },
  { cmd: "cargo install --path tools/spectra-cli", desc: "Install the spectralang CLI on your PATH" },
] as const;

export const docLinks = [
  { title: "Language reference", href: "docs/language-reference-alpha.md", note: "alpha reference" },
  { title: "The Book", href: "docs/book", note: "guides" },
  { title: "API library", href: "docs/api", note: "under active development" },
  { title: "Strategic plan", href: "docs/production-ai-implementation-plan.md", note: "30+ phases" },
  { title: "Roadmap", href: "roadmap/roadmap.toml", note: "machine-readable" },
] as const;

export const codeSamples = {
  quickstart: {
    label: "quickstart.spectra",
    title: "Quickstart",
    file: "examples/syntax_quickstart.spectra",
    code: `module syntax_quickstart
from std.io import println
func welcome(name: string) returns string {
    return f"Ola, {name}!"
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
        println("sintaxe clara")
    } else {
        println("continue explorando")
    }
    return 0
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
